'use client'

import { useFormContext, useWatch } from 'react-hook-form';
import { cn } from '@/src/lib/utils'
import { Check } from 'lucide-react'
import { useEffect } from 'react';

type FormValues = {
  petType: string;
  petName: string;
  petGender: string;
  petBreed: string;
  petDescription: string;
  petsCount: number;
  serviceType: string;
  visitReason: string;
  visitDetails?: string;
  appointmentDate: string;
  appointmentTime: string;
  termsAccepted: boolean;
};

interface StepManagerProps {
    step: number
    expanded: boolean;
    setStep1Valid: (isValid: boolean) => void;
    setStep2Valid: (isValid: boolean) => void;
    setStep3Valid: (isValid: boolean) => void;
    setExpanded: (expanded: boolean) => void;
}

export default function StepManager ({ 
    step,
    setStep1Valid,
    setStep2Valid,
    setStep3Valid,
    expanded,
    setExpanded,
 }: StepManagerProps){
    const methods = useFormContext<FormValues>();
    const { setValue, getValues } = methods

    const petType = useWatch({ name: 'petType', control: methods.control })

const petName = useWatch({ name: 'petName', control: methods.control })
const petGender = useWatch({ name: 'petGender', control: methods.control })
const petBreed = useWatch({ name: 'petBreed', control: methods.control })
const petDescription = useWatch({ name: 'petDescription', control: methods.control })
const petsCount = useWatch({ name: 'petsCount', control: methods.control })
const serviceType = useWatch({ name: 'serviceType', control: methods.control })
const visitReason = useWatch({ name: 'visitReason', control: methods.control })
const appointmentDate = useWatch({ name: 'appointmentDate', control: methods.control })
const appointmentTime = useWatch({ name: 'appointmentTime', control: methods.control })
const termsAccepted = useWatch({ name: 'termsAccepted', control: methods.control })

useEffect (() => {
if (petType && petName && petGender) {
if (petType === 'OTHER') {
setStep1Valid(!!petDescription)
} else {
setStep1Valid(!!petBreed)
}
} else {
setStep1Valid(false)
}
}, [petType, petName, petGender, petBreed, petDescription, petsCount ])

useEffect (() => {
    if (petType === 'OTHER') {
        if (getValues('petBreed') !== '') setValue('petBreed', '')
    } else {
    if (getValues( 'petDescription') !== '') setValue( 'petDescription', '')
    }
}, [petType, getValues, setValue])

useEffect (() => {
if (serviceType === 'baño' || serviceType === 'corte baño') {
setStep2Valid(true)
} else if (serviceType === 'visita medica') {
setStep2Valid(!!visitReason)
} else {
setStep2Valid(false)
}
}, [serviceType, visitReason])

useEffect (() => {
if (serviceType === 'visita medica') {
if (!expanded) setExpanded(true)
} else {
if (expanded) {
if (getValues('visitReason') !== '') setValue('visitReason', '')
if (getValues('visitDetails') !== '') setValue('visitDetails', '')
setExpanded (false)
}
}
}, [serviceType, expanded, getValues, setValue])

useEffect (() => {
setStep3Valid(! !appointmentDate && !!appointmentTime && termsAccepted)
}, [appointmentDate, appointmentTime, termsAccepted])

// useEffect(() => {
//     console.log('testing')
//     console.log('currentsValues:', methods.formState.values)
// }, [ methods ])

  return (
    <div className='px-6 flex justify-between items-center'>
        <div className={cn('flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground', step >= 1 && 'bg-lime-600 text-white')}>
            {step > 1 ? <Check className='size-4'/> : '1'}
            </div>
            
            <div className={cn('h-1 flex-1 mx-2 bg-muted', step >= 2 && 'bg-lime-600')}/>

        <div className={cn('flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground', step >= 2 && 'bg-lime-600 text-white')}>
            {step > 2 ? <Check className='size-4'/> : '2'}
            </div>

            <div className={cn('h-1 flex-1 mx-2 bg-muted', step >= 3 && 'bg-lime-600')}/>

        <div className={cn('flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground', step >= 3 && 'bg-lime-600 text-white')}>
            {step > 3 ? <Check className='size-4'/> : '3'}
            </div>

            <div className={cn('h-1 flex-1 mx-2 bg-muted', step >= 4 && 'bg-lime-600')}/>

        <div className={cn('flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground', step >= 4 && 'bg-lime-600 text-white')}>
            4
            </div>
    </div>
  )
}
