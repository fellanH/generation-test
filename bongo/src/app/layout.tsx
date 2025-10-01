import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bongo - AI Generative Studio',
  description: 'User-friendly, persistent web interface for Fal.ai models',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}

