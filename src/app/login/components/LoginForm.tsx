'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

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
import login from '@/src/actions/login';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
    email: z
    .string()
    .min(1, {message: 'El correo electrónico es requerido'})
    .email({ message: 'El correo electrónico no es válido'}),
    password: z.string().min(1, { message: 'La contraseña es requerida'})
})

type LoginFormValues = z.infer<typeof schema>

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm ({
        resolver: zodResolver(schema)
    })

    const [generalError, setGeneralError] = useState<string | null>(null)

    const onSubmit = async (data: LoginFormValues) => {
            const {success, error}  = await login(data)

            if(success) {
                window.location.href = '/'
            } else {
                console.log('login failed:', error)
                setGeneralError(error as string)
            }
    }

  return (
    <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center text-lime-600'>Iniciar Sesión</CardTitle>
            <CardDescription className='text-center'>Ingresa tu correo y tu contraseña para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <CardContent className='space-y-4'>
            {generalError && <p className='p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
                {generalError}
                </p>}
            <div className='space-y-2'>
                <Label>Correo Electrónico</Label>
                <Input type='email' placeholder='ejemplo@correo.com'{...register('email')} />
                {errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>}
            </div>
            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                <Label>Contraseña</Label>
                <Link href='/forgot-password' className='text-sm text-sky-600 hover:underline'>
                ¿Olvidaste tu contraseña?
                </Link>
                </div>
                <Input type='password' placeholder='Contraseña' {...register('password')}/>
                {errors.password && <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>}
            </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
            <Button 
            type='submit' 
            className='w-full bg-lime-600 hover:bg-lime-700'
            disabled={isSubmitting}>
                {isSubmitting ? <>
                <Loader2 className='size-5 animate-spin '/> 
                Iniciando sesión...
                </>
                : 'Iniciar sesión'}
            </Button>
            <div className='text-center text-sm'>
                ¿No tienes una cuenta? {' '}
                <Link href='/register' className='text-sky-600 hover:underline'>
                Regístrate aqui
                </Link>
            </div>
        </CardFooter>
        </form>
    </Card>
)
}

