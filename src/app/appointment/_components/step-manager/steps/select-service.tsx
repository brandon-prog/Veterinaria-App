import { Label } from '@/src/components/ui/label';
import { cn } from '@/src/lib/utils'
import { PawPrint } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';

const visitReasons = ['Consulta general', 'Vacunación', 'Enfermedad', 'Lesión', 'Control', 'Emergencia', 'Laboratorio y exámenes', 'Otro']


export default function SelectService({ expanded }: { expanded: boolean }) {
  const{ 
      register,
      setValue,
      watch,
      control
    } = useFormContext ()

    const serviceType = watch('serviceType')

  return (
    <div className='py-3 space-y-6'>
      <h3 className='text-xl font-semibold text-center text-lime-600'>
        Elige un servicio
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[
          {value: 'baño', label: 'Baño'},
          {value: 'corte baño', label: 'Corte de pelo y baño'},
          {value: 'visita medica', label: 'Visita Médica'},
        ].map((option) => (
          <div key={option.value}
          className={cn('relative p-4 border-2 rounded-lg cursor-pointer hover:border-lime-600 flex flex-col items-center', serviceType === option.value && 'border-lime-600 bg-lime-50')}
          onClick={() => setValue('serviceType', option.value)}
          >
              <div className='bg-lime-300 rounded-full p-4 mb-2'>
                <PawPrint className='size-6 text-lime-800'/>
              </div>
              <span>{option.label}</span>
              {serviceType === option.value && <div className='absolute top-2 right-2 size-4 bg-lime-600 rounded-full'/>}
          </div>
        ))}
        </div>

        { expanded && (
      <div className='mt-4'>
        <div className='space-y-2'>
          <Label>Razón de tu visita <span className='text-red-500'>*</span></Label>
          <Controller 
          control={control}
          name='visitReason'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Seleccione una razón'/>
              </SelectTrigger>
              <SelectContent>
                {visitReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          />
        </div>

        <div className='space-y-2'>
          <Label>Platícanos sobre la consulta (opcional)</Label>
          <Textarea 
          placeholder='Describe los síntomas o la razón de tu consulta'
          className='min-h-28 risize-none'
          {...register('visitDetails')}
          />
        </div>
      </div>
        )}

    </div>
  )
}
