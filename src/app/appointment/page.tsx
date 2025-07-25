import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import AppointmentForm from "./_components/AppointmentForm";

export default function AppointmentPage () {
  return (
    <section className='min-h-dvh grid place-items-center px-4'>
      <div className='w-full max-w-3xl mx-auto py-12'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl text-lime-600 font-bold text-center'>Cita</CardTitle>
          <CardDescription className='text-center'>
            Completa el formulario a continuación para agendar una cita para tu mascota.
          </CardDescription>
        </CardHeader>
        <AppointmentForm/>
      </Card>
      </div>
    </section>
  )
}
