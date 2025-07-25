import Image from "next/image";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/src/components/ui/button";


export default async function Home() {

  return(
  <>
    <section className='py-12 lg:py-32 bg-gradient-to-b from-lime-100 to-white'>
      <div className="max-w-7xl mx-auto px-4 md:px-6 ">
        <div className="grid gap-6 lg:gap-12 md:grid-cols-2 items-center">
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl text-lime-500'>
              Cuidamos a tus mascotas como familia
              </h1>
            <p className='text-muted-foreground md:text-xl'>Clínica Veterinaria ofrece atención veterinaria compasiva para todos tus amigos peludos, emplumados y escamosos.</p>
            <Link href='/appointment' >
            <Button className='bg-lime-500 hover:bg-lime-600'>
              Agendar cita 
              <CalendarPlus className='ml-2 size-5'/>
            </Button>
            </Link>

          </div>
          <div className='relative size-96 md:size-[550px] overflow-hidden mx-auto'>
            <Image 
            src='https://static.vecteezy.com/system/resources/previews/053/477/911/non_2x/dog-and-cat-together-in-playful-moment-free-png.png'
            alt='Mascotas'
            fill
            className='object-contain'
            priority
            />
          </div>
        </div>
      </div>
    </section>
  </>
  );
}
