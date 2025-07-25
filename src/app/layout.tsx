import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import "./globals.css";

import Header from "@/src/components/header";
import { auth } from "../auth";

const inter = Inter({subsets: ['latin']})


export const metadata: Metadata = {
  title: "Veterinaria",
  description: "Aplicación para la gestión clinica veterinaria",
};

type RootLayoutProps = { 
  children: ReactNode 
};

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body className={`${inter.className}`}>
            <div>
              <Header />
          <main className="flex-1">
            {children}
          </main>
            </div>
        </body>
      </html>
    </SessionProvider>
  );

}
