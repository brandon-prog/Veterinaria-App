import { Button } from '@/src/components/ui/button'
import { Edit, PawPrint } from 'lucide-react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

const doctors = [
  { id: "cualquier profesional", nombre: "Cualquier profesional", foto: "https://avatar.iran.liara.run/public" },
  { id: "dr. garcía", nombre: "Dr. García", foto: "https://avatar.iran.liara.run/public/boy?username=garcia" },
  { id: "dra. rodríguez", nombre: "Dra. Rodríguez", foto: "https://avatar.iran.liara.run/public/girl?username=rodriguez" },
  { id: "dr. lópez", nombre: "Dr. López", foto: "https://avatar.iran.liara.run/public/boy?username=lopez" },
  { id: "dra. martínez", nombre: "Dra. Martínez", foto: "https://avatar.iran.liara.run/public/girl?username=martinez" },
]

interface AppointmentSummaryProps {
  goToStep: (step: number) => void }

export default function AppointmentSummary({goToStep}: AppointmentSummaryProps) {
  const {watch} = useFormContext()
  const formData = watch()

    const doctor = watch('doctor')

  const selectedDoctor = doctors.find((doc) => doc.id === doctor) ?? doctors[0];

  return (
    <div>
      <h3 className='text-xl font-semibold text-center text-lime-500'>
        Resumen de tu cita
        </h3>

        <div className='space-y-4'>
          <ServiceSummary
          title='Información de tu mascota'
          onEdit={() => goToStep(1)}
          >
            <div className='space-y-1'>
          <p><b>Tipo:</b>{formData.petType === 'DOG' ? 'Perro' : formData.petType === 'CAT' ? 'Gato' : 'Otro'}</p>
          <p><b>Nombre: </b>{formData.petName}</p>

          {formData.petType !== 'OTHER' ? (
            <p><b>Raza:</b>{formData.petBreed}</p>
          ) : (
            <p><b>Descripción: </b>{formData.petDescription}</p>
          )}
          {formData.petAge && <p><b>Edad:</b>{formData.petAge}</p>}
          {formData.petWeight && <p><b>Peso:</b>{formData.petWeight}</p>}
          </div>
          </ServiceSummary>

          <ServiceSummary
          title='Servicio seleccionado'
          onEdit={() => goToStep(2)}
          >
            <div className='space-y-1'>
              <p><b>Servicio:</b>{formData.serviceType === 'baño' ? 'Baño' :
              formData.serviceType === 'corte baño' ? 'Corte de pelo y baño' : 
              'Visita Médica'
              }</p>
              {formData.serviceType === 'visita medica' && (<>
              {formData.visitReason && <p><b>Razón:</b> {formData.visitReason}</p>}
              {formData.visitDetails && <p><b>Detalles:</b>{formData.visitDetails}</p>}
              </>)}
            </div>
          </ServiceSummary>

          <ServiceSummary
          title='cita programada'
          onEdit={() => goToStep(3)}
          >
            <div className='flex items-center gap-4'>
              {/*imagen del doctor*/}
              <Image src={selectedDoctor.foto} alt={selectedDoctor.nombre} width={100} height={100} className='size-16' />
            </div>
            <p><b>Profesional:</b>{formData.doctor}</p>
            {formData.appointmentDate && <p><b>Fecha:</b>{formData.appointmentDate}</p>}
            {formData.appointmentTime && <p><b>Horario:</b>{formData.appointmentTime}</p>}
          </ServiceSummary>
        </div>
        </div>
  )
}

interface ServiceSummaryProps {
  title: string;
  onEdit?: () => void;
  children?: React.ReactNode;
}

function ServiceSummary ({ title, onEdit, children }: ServiceSummaryProps) {
  return (
    <div className='p-4 border rounded-lg'>
            <div className='flex justify-between'>
              <h4 className='font-medium'>
              <PawPrint className='size-4 mr-2 text-lime-500'/> {title}
              </h4>
              {onEdit && (
              <Button
              type='button' 
              variant='ghost'
              size='sm'
              onClick={onEdit}
              className='text-lime-600 hover:text-lime-700'
              >
                <Edit/>Modificar
                </Button>
              )}
            </div>            
            {children}
          </div>
  )
}
//02:28:52