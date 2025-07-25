import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import Image from 'next/image';
import { Input } from '@/src/components/ui/input';
import { Checkbox } from '@/src/components/ui/checkbox';

const doctors = [
  { id: "cualquier profesional", nombre: "Cualquier profesional", foto: "https://avatar.iran.liara.run/public" },
  { id: "dr. garcía", nombre: "Dr. García", foto: "https://avatar.iran.liara.run/public/boy?username=garcia" },
  { id: "dra. rodríguez", nombre: "Dra. Rodríguez", foto: "https://avatar.iran.liara.run/public/girl?username=rodriguez" },
  { id: "dr. lópez", nombre: "Dr. López", foto: "https://avatar.iran.liara.run/public/boy?username=lopez" },
  { id: "dra. martínez", nombre: "Dra. Martínez", foto: "https://avatar.iran.liara.run/public/girl?username=martinez" },
]

const availableTimes = ['9:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00']

export default function SheduleAppointment() {
  const { register, control, watch, setValue } = useFormContext()
  const doctor = watch('doctor')
  const termsAccepted = watch('termsAccepted')

  const today = new Date().toISOString().split('T')[0]
  const selectedDoctor = doctors.find((doc) => doc.id === doctor) ?? doctors[0];
  return (
    <div className='py-3 space-y-6'>
      <h3 className='text-xl font-semibold text-center text-lime-500'>
        Agendar cita
        </h3>

        <div className='space-y-2'>
          <Label></Label>
          <Controller 
          control={control}
          name='doctor'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder='Selecciona un profesional' />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id} >{doctor.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          />

        </div>

        {selectedDoctor && (
          <div className='bg-lime-50 border-2 border-lime-600 rounded-lg p-4 flex items-center gap-4'>
            <div>
            <Image 
            width={1000}
            height={1000}
            src={selectedDoctor.foto} 
            alt={selectedDoctor.nombre}
            className='size-16'
            />
            </div>
            <div>
              <p className='font-medium'>{selectedDoctor.nombre}</p>
              <p>Profesional seleccionado</p>
            </div>
          </div>
        )}

        <div className='space-y-2'>
          <Label>Fecha de la cita <span className='text-red-500'>*</span></Label>
          <Input 
          type='date'
          {...register('appointmentDate')}
          min={today} 
          />
        </div>

        <div className='space-y-2'>
          <Label>Horario disponible <span className='text-red-500'>*</span></Label>
          <Controller 
          control={control}
          name='appointmentTime'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder='Selecciona un horario' />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>{time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          />
        </div>

        <div>
        <Checkbox
        id='termsAccepted'
        checked={termsAccepted}
        onCheckedChange={(checked) => setValue('termsAccepted',Boolean(checked))}
        />
        <Label htmlFor='termsAccepted'>
          Acepto los términos y condiciones <span className='text-red-500'>*</span></Label>

        </div>

    </div>
  )
}
//00:31:39