import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './db/user'

export default {
      providers: [
    Credentials({
        authorize: async (credentials: any) => {
          const user = await getUserByEmail(credentials.email)
            return user
        } 
    })
  ],
  callbacks: {
    async signIn () {
      return true
    },
    async jwt ({token, user }) {
      if (!token.sub) return null

      if (user) {
        token.sub = user.id
}

      return token
    },
    async session ({session, token }) {
      if (token.sub && session.user){
        session.user.id = token.sub
      }

      return session
    }
  }
} satisfies NextAuthConfig

