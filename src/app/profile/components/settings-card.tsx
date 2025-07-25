'use client'

import { Button } from "@/src/components/ui/button"
import {
    Card,
    CardContent, 
    CardHeader, 
    CardTitle,
    CardDescription
} from '@/src/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/components/ui/alert-dialog'
import { Trash2 } from "lucide-react"

export default function SettingsCard() {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Seguridad de la Cuenta</CardTitle>
        <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <h3 className='font-medium'>Cambiar contraseña</h3>
          <p className='text-sm text-muted-foreground'>Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
          <Button variant='outline'>Cambiar Contraseña</Button>
        </div>

        <div className='space-y-2'>
          <h3 className='font-medium'>Eliminar Cuenta</h3>
          <p className='text-sm text-muted-foreground'>Al eliminar tu cuenta, todos tus datos seran eliminados permanentemente.</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
          <Button variant='destructive'>
            <Trash2 className='mr-2'/> Eliminar Cuenta
          </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Todos los datos asociados a tu cuenta serán eliminados permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className='bg-red-600 hover:bg-red-700'>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
    )
}

