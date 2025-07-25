'use client'

import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  return (
    <header className='sticky top-0 z-50 bg-gradient-to-b from-white to-lime-100'>
      <div className='max-w-7xl mx-auto h-16 px-4 md:px-6 md:h-28 flex justify-between items-center'>
        <div className="flex flex-col items-center justify-center mt-4 h-dvh">
          <Link href='/' className='flex items-center '>
            <Image 
            src='/logo.png'
            alt='Clinica'
            width={100}
            height={100}
            className="block object-contain"
            />
          </Link>
        </div>
        <div>
          <h1 className='text-xl md:text-4xl font-semibold text-lime-700'>Clinica Veterinaria</h1>
        </div>
        <div>
          {isAuthenticated ? (
            <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full border border-black'>
                  <User />
                  <span className='sr-only'>Menú de perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href='/profile'> Mi Perfil </Link> 
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/pets'> Mis Mascotas </Link> 
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/appointment'> Agendar Cita </Link> 
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <Link href='/login'>
                <Button variant='outline' size='sm'>
                  Iniciar sesión
                </Button>
              </Link>
              <Link href='/register'>
                <Button size='sm' className='bg-lime-600 hover:bg-lime-700'>
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}