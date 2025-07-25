'use client'

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button type='button' onClick={signOut} className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200'>
        
        Logout</button>
    )
}
