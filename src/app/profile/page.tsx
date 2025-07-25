import ProfileCard from "./components/profileCard";
import SettingsCard from "./components/settings-card";

export default function ProfilePage() {
  return (
    <section className='w-full py-6 bg-gradient-to-b from-lime-100 to-white'>
<div className='max-w-7xl mx-auto px-4 md:px-6 '>
    <h1 className='text-3xl font-bold text-lime-600 mb-6'>Mi Perfil</h1>

    <div className='grid gap-6 md:grid-cols-2'>
        {/* Actualizar nuestra informacion form */}
        <ProfileCard />
        {/* Las configuraciones de la cuenta */}
        <SettingsCard />
    </div>
</div>
    </section>
  )
}
