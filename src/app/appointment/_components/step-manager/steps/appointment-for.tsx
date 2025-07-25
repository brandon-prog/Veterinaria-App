import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/src/components/ui/label';
import { cn } from '@/src/lib/utils';
import { PiCatLight } from 'react-icons/pi';
import { TbDog } from 'react-icons/tb';
import { Input } from '@/src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';


const dogBreeds = ['Labrador', 'Bulldog', 'Pastor Alemán', 'Golden Retriever', 'Chihuahua', 'Poodle', 'Husky', 'Beagle', 'Boxer', 'Otro']
const catBreeds = ['Persa', 'Siamés', 'Maine Coon', 'Bengalí', 'Ragdoll', 'Sphynx', 'Angora', 'Británico de Pelo Corto', 'Abisinio', 'Otro']

export default function AppointmentFor() {
  const{ 
    register,
    setValue,
    watch,
    control
  } = useFormContext();

  const petType = watch('petType')

  return (
    <div className='py-3 space-y-6'>
        <h3 className='text-xl font-semibold text-center text-lime-500'>
            ¿Para quién es la cita?
            </h3>

            <div className='space-y-2'>
              <Label className='text-sm'>Especie <span className='text-red-600 '>*</span></Label>
              <div className='grid grid-cols-3 gap-4'>
                {['DOG', 'CAT', 'OTHER'].map((type) => (
                  <div 
                  key={type} 
                  className={cn('relative rounded-lg border-2 p-4 cursor-pointer flex flex-col items-center hover:border-lime-600', petType === type && 'border-lime-600 bg-lime-100')}
                  onClick={() => setValue('petType', type)}>
                    <div className='relative text-4xl' aria-label='especie'>
                        {type === 'DOG' ? <TbDog /> :  type === 'CAT' ? <PiCatLight /> : '🐾'}
                    </div>
                    <span>{type === 'DOG' ? 'Perro' :  type === 'CAT' ? 'Gato' : 'Otro' }
                    </span>
                    {petType === type && <div className='absolute top-2 right-2 size-4 bg-lime-600 rounded-full'/>}
                  </div>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='petName'>Nombre de tu mascota <span className='text-red-600 '>*</span></Label>
                <Input id='petName' {...register('petName')} placeholder='Ingresa el nombre'/>
              </div>

              {petType && petType !== 'OTHER' && (
              <div className='space-y-2'>
                <Label>Raza <span className='text-red-600 text-xl'>*</span></Label>
                <Controller 
                control={control}
                name='petBreed'
                render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccione la raza'/>
                  </SelectTrigger>
                  <SelectContent>
                    {(petType === 'DOG' ? dogBreeds : catBreeds).map((breed) => (
                      <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                )}

                />




              </div>
              )}

              <div className='space-y-2'>
                <Label>Género <span className='text-red-500'>*</span></Label>
                <Controller 
                control={control}
                name='petGender'
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione el género' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MALE'>Macho</SelectItem>
                      <SelectItem value='FEMALE'>Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                />
              </div>
            </div>

{petType === 'OTHER' && (
            <div className='space-y-2'>
              <Label htmlFor='petDescription'>Describe a tu mascota <span className='text-red-500'>*</span></Label>
              <Textarea id='petDescription' 
              {...register('petDescription')} 
              placeholder='Especie, tamaño, características...'
              />
            </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Edad (opcional)</Label>
                <Input {...register('petAge')} placeholder='Ej: 2 años' />
              </div>
              <div>
                <Label>Peso (opcional)</Label>
                <Input {...register('petWeight')} placeholder='Ej: 5 kg'/>
              </div>
            </div>
    </div>
  )
}
