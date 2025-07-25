'use client'

import { signOut } from 'next-auth/react'

export default function Logout() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <button
      type='button'
      onClick={handleSignOut}
      className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200'
    >
      Logout
    </button>
  )
}