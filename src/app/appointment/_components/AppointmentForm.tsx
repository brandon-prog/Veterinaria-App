'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { CardContent, CardFooter } from '@/src/components/ui/card';

import StepManager from './step-manager/step-manager';
import AppointmentFor from './step-manager/steps/appointment-for';
import SelectService from './step-manager/steps/select-service';
import SheduleAppointment from './step-manager/steps/shedule-appointment';
import AppointmentSummary from './step-manager/steps/appointment-summary';

const formSchema = z.object({
  petSelection: z.string(),
  selectedPetId: z.string().optional(),
  petType: z.string().optional(),
  petName: z.string().optional(),
  petGender: z.string().optional(),
  petBreed: z.string().optional(),
  petDescription: z.string().optional(),
  petImage: z.union([z.string(), z.instanceof(File)]).optional(),
  petAge: z.string().optional(),
  petWeight: z.string().optional(),
  serviceType: z.string(),
  visitReason: z.string().optional(),
  visitDetails: z.string().optional(),
  termsAccepted: z.boolean(),
  doctor: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  petsCount: z.number().optional(),
})

type FormData = z.infer<typeof formSchema>;

export default function AppointmentForm() {
    const [step, setStep] = useState(1);
    const [step1Valid, setStep1Valid] = useState(false)
    const [step2Valid, setStep2Valid] = useState(false)
    const [step3Valid, setStep3Valid] = useState(false)
    const [expanded, setExpanded] = useState(false);

    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
      petName:'',
      petType:'',
      petGender:'',
      petBreed:'',
      petDescription:'',
      petImage:'',
      petAge:'',
      petWeight:'',
      serviceType:'',
      visitReason:'',
      visitDetails:'',
      doctor: 'cualquier profesional',
      appointmentDate:'',
      appointmentTime:'',
      termsAccepted: false,
      selectedPetId:'',
      petSelection: 'existig',
      petsCount: 0,
        }
    })
    
    const onSubmit = async (data: FormData) => {

    }

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)
    const goToStep = (step: number) => setStep(step)

return (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
      <StepManager 
        step={step}
        setStep1Valid={setStep1Valid}
        setStep2Valid={setStep2Valid}
        setStep3Valid={setStep3Valid}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <CardContent>
        {step === 1 && <AppointmentFor />}
        {step === 2 && <SelectService expanded={expanded} />}
        {step === 3 && <SheduleAppointment />}
        {step === 4 && <AppointmentSummary goToStep={goToStep} />}
      </CardContent>
      <CardFooter className='flex justify-between'>
        {step > 1 ? (
          <Button type='button' className='bg-lime-600 hover:bg-lime-700' onClick={prevStep}>
            <ArrowLeft />
            Anterior
          </Button>
        ) : (
          <Link href="/">
            <Button variant='outline' type='button'>
              <ArrowLeft />
              Volver al inicio
            </Button>
          </Link>
        )}
        
        {step < 4 ? (
          <Button
            type='button'
            onClick={nextStep}
            className="bg-lime-600 hover:bg-lime-700 ml-auto"
            disabled={
              (step === 1 && !step1Valid) ||
              (step === 2 && !step2Valid) ||
              (step === 3 && !step3Valid)
            }
          >
            Siguiente
            <ArrowRight />
          </Button>
        ) : (
          <Button type='submit' className="ml-auto bg-lime-600">
            Confirmar Cita
          </Button>
        )}
      </CardFooter>
    </form>
  </FormProvider>
)
}