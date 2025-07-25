import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { PrismaAdapter } from "@auth/prisma-adapter"
import  { prisma } from '@/src/lib/prisma'

export const { 
    handlers, 
    signIn, 
    signOut, 
    auth 
} = NextAuth({
        adapter: PrismaAdapter(prisma),
        session: {strategy: 'jwt'},
        secret: process.env.NEXTAUTH_SECRET,
        ...authConfig
})