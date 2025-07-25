import{
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/src/components/ui/card';
import RegisterForm from "./components/registerForm";

export default function RegisterPage() {
  return (
    <section className='min-h-dvh flex justify-center items-center bg-lime-100'>
        <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center text-lime-600'>Crear una Cuenta</CardTitle>
            <CardDescription className='text-center'>Ingresa tus datos para crear una cuenta</CardDescription>
        </CardHeader>
        <RegisterForm/>
        </Card>
    </section>
  )
}
