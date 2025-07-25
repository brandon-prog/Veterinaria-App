'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
    CardFooter,
    CardDescription
} from '@/src/components/ui/card'
import { useState } from 'react'
import { Edit, Mail, MapPin, Phone, Save, User } from 'lucide-react'

const userData = {
    nombre: 'Brandon Salazar',
    email: 'BrandonSalazar@ejemplo.com',
    telefono: '123-456-7890',
    direccion: '123 Calle Principal, Ciudad, País',
}

export default function ProfileCard() {
    const[formData, setFormData] = useState (userData)
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} =e.target 
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Gestiona tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
            {isEditing ? (
            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Label>Nombre Completo</Label>
                    <Input type='text' name='nombre' value={formData.nombre} onChange={handleChange}/>
                </div>

                <div className='space-y-2'>
                    <Label>Correo Electrónico</Label>
                    <Input type='email' name='email' value={formData.email} onChange={handleChange}/>
                </div>

                <div className='space-y-2'>
                    <Label>Teléfono</Label>
                    <Input type='tel' name='telefono' value={formData.telefono} onChange={handleChange}/>
                </div>

                <div className='space-y-2'>
                    <Label>Dirección</Label>
                    <Input type='text' name='direccion' value={formData.direccion} onChange={handleChange}/>
                </div>
            </div>
            ) : (
            <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                    <User className='text-lime-600' />
                    <div>
                        <p className='text-sm text-muted-foreground'>Nombre</p>
                        <p className='font-medium'>{userData.nombre}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <Mail className='text-lime-600' />
                    <div>
                        <p className='text-sm text-muted-foreground'>Correo Electrónico</p>
                        <p className='font-medium'>{userData.email}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <Phone className='text-lime-600' />
                    <div>
                        <p className='text-sm text-muted-foreground'>Teléfono</p>
                        <p className='font-medium'>{userData.telefono}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <MapPin className='text-lime-600' />
                    <div>
                        <p className='text-sm text-muted-foreground'>Dirección</p>
                        <p className='font-medium'>{userData.direccion}</p>
                    </div>
                </div>
            </div>
            )}
        </CardContent>
        <CardFooter className='flex justify-between'>
            {isEditing ? (
        <>
        <Button variant='outline' onClick={() => setIsEditing(false)}
            >
                Cancelar
            </Button>
                <Button 
            className='bg-lime-600 hover:bg-lime-700' 
            onClick={() => setIsEditing(true)}
            >
                <Save className='mr-2'/> Guardar Cambios
            </Button>
        </>
            ) : (
                <Button 
            className='bg-lime-600 hover:bg-lime-700' 
            onClick={() => setIsEditing(true)}
            >
                <Edit className='mr-2'/> Editar Información
            </Button>
            )}

        </CardFooter>
    </Card>
  )
}
