import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth: middleware } = NextAuth(authConfig)

export default middleware ((request) => {
    const protectedRoutes = ['/profile', '/appointment', 'pets']
    const publicRoutes = [ '/login', '/register']

    const currentPat = request.nextUrl.pathname

    const isAuthenticated = !!request.auth

    if( isAuthenticated && publicRoutes.includes(currentPat)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isAuthenticated && protectedRoutes.includes(currentPat)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    


    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!_next|favicon.ico|.*\\..*).*)']
}