'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signIn } from "@/src/auth"
import { getUserByEmail } from '../db/user'

const loginRoutSchema = z.object({
    email: z
    .string()
    .min(1, {message: 'El correo electrónico es requerido'})
    .email({ message: 'El correo electrónico no es válido'}),
    password: z.string().min(1, { message: 'La contraseña es requerida'})
})

type LoginRoutSchema = z.infer<typeof loginRoutSchema>

export default async function login (data: LoginRoutSchema) {
try {
    const validatedFields = loginRoutSchema.safeParse(data)
    
    if(!validatedFields.success) {
        return { success: false, error: validatedFields.error.format() }
    }
    
    const{ email, password } = validatedFields.data
    
    const existingUser = await getUserByEmail(email)
    
    if(!existingUser || !existingUser.email) {
        return { success: false, error: 'El usuario no existe' }
    }
    
    const passwordsMatch = await bcrypt.compare(password, existingUser.password as string)
    
    if(!passwordsMatch) {
        return { success: false, error: 'Contraseña incorrecta' }
    }
    
    await signIn('credentials', {
        email,
        password,
        redirect: false
    })
    
    return { success: true, error: null }
} catch (error) {
    console.log('[actions/login]:', error)
    return { success: false, error: 'Internal Server Error'  }
}
}
