import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './db/user'

export const authConfig: NextAuthConfig = {
  session: {
    strategy: 'jwt', 
  },
  secret: process.env.NEXTAUTH_SECRET, 
  providers: [
    Credentials({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'tu@email.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null
        }

        const user = await getUserByEmail(credentials.email)
        if (!user) return null

        // asegúrate de devolver un objeto con al menos { id: string, email?: string, name?: string }
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.sub es requerido por defecto y se asigna aquí
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn() {
      return true
    }
  }
}

export default authConfig
