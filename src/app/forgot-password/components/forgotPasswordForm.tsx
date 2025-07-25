'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/src/components/ui/card';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  return (
    <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center text-lime-600'>Recuperar Cuenta</CardTitle>
            <CardDescription className='text-center'>Ingresa tu correo electrónico y te enviaremos un enlace para restablecere tu contraseña</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
            <div className='space-y-2'>
                <Label>Correo Electrónico</Label>
                <Input type='email' placeholder='ejemplo@correo.com'/>
            </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
            <Button className='w-full bg-lime-600 hover:bg-lime-700'>
                Enviar Enlace de Recuperación
            </Button>
            <div className='text-center text-sm'>
                <Link href='/login' className='text-sky-600 hover:underline'>
                Volver al inicio de sesión
                </Link>
            </div>
        </CardFooter>
    </Card>
)
}
