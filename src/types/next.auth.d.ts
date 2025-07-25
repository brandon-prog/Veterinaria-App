import 'next-auth/jwt'

declare module 'next-auth/jtw' {
    interface JWT {
        phone: string | null
    }

}