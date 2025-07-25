import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/src/lib/prisma'
import { getUserByEmail } from '@/src/db/user'

const registerRouteSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('El correo no es válido').min(1, 'El correo es obligatorio'),
    phone: z.string().min(1, 'El teléfono es obligatorio'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})


export async function POST (request: NextRequest) {
    try{
        const body = await request.json()
    
        const validatedFields = registerRouteSchema.safeParse(body)
    
        if(!validatedFields.success){
            return NextResponse.json({
                error: validatedFields.error.format()
            }, {status: 422 })
        }
    
        const { name, 
                email, 
                phone, 
                password 
            } = validatedFields.data
    
            const existingUser = await getUserByEmail(email)
    
            if(existingUser) {
                return NextResponse.json({error: 'El correo ya está registrado'}, {status: 409 })
            }
    
            const hashedPassword = await bcrypt.hash (password, 10)
    
            await prisma.user.create({
                data: {
                name,
                email,
                phone,
                password: hashedPassword
                }
            })
    
            
            return NextResponse.json({
                message: 'User created successfully' }, {status: 201})
                
            } catch(error){
            console.log('[api/auth/register]:', error)
            return NextResponse.json({
                error: 'Internal Server Error' }, {status: 500})
                
        }
}
