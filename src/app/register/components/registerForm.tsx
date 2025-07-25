'use client';

import Link from 'next/link';
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import{ CardContent,CardFooter } from '@/src/components/ui/card';
import { Loader2 } from 'lucide-react';

const schema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('El correo no es válido').min(1, 'El correo es obligatorio'),
    phone: z.string().min(1, 'El teléfono es obligatorio'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'La confirmación de contraseña es obligatoria')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
})

type RegisterFormData = z.infer<typeof schema>

export default function RegisterForm() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        try{
            const response = await axios.post('/api/auth/register', data)     
            
            if (response.status === 201) {
                window.location.href = '/login'
            }
        } catch(error){
            console.error('Error al crear la cuenta:', error)
        }
    }
  return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <CardContent className='space-y-4'>
            <div className='space-y-2'>
                <Label>Nombre Completo</Label>
                <Input type='text' placeholder='john Doe' {...register('name')}/>
                {errors.name && (<p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>)}
            </div>
            <div className='space-y-2'>
                <Label>Correo Electrónico</Label>
                <Input type='email' placeholder='ejemplo@correo.com' {...register('email')} />
                {errors.email && (<p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>)}
            </div>
            <div className='space-y-2'>
                <Label>Teléfono</Label>
                <Input type='tel' placeholder='(123) 456-7890' {...register('phone')}/>
                {errors.phone && (<p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>)}
            </div>
            <div className='space-y-2'>
                <Label>Contraseña</Label>
                <Input type='password' {...register('password')}/>
                {errors.password && (<p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>)}
            </div>
                        <div className='space-y-2'>
                <Label>Confirmar Contraseña</Label>
                <Input type='password' {...register('confirmPassword')}/>
                {errors.confirmPassword && (<p className='text-red-600 text-sm mt-1'>{errors.confirmPassword.message}</p>)}
            </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
            <Button className='w-full bg-lime-600 hover:bg-lime-700'
            disabled={isSubmitting}>
            { isSubmitting ?<> 
            <Loader2 className='size-5 animate-spin '/> 
            Creando Cuenta...
            </> : 'Crear Cuenta'}
            </Button>
            <div className='text-center text-sm'>
                ¿Ya tienes cuenta? {' '}
                <Link href='/login' className='text-sky-600 hover:underline'>
                Iniciar Sesión
                </Link>
            </div>
        </CardFooter>
        </form>
  )
}
