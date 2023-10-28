import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextSessionProvider from './providers'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers';
import { authOptions } from './api/auth/[...nextauth]/route'
import Nav from './components/layout/nav/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cellar',
  description: 'A modern winemaker\'s log.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <NextSessionProvider session={session}>
        <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-50`} >
          <Nav />
          {children}
        </body>
      </NextSessionProvider>
    </html>
  )
}
