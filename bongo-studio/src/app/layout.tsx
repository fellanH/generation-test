import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bongo – AI Generative Studio',
  description: 'User-friendly Fal.ai generative studio with persistence'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">Bongo</h1>
            <nav className="flex gap-4 text-sm">
              <a className="hover:underline" href="/">Home</a>
              <a className="hover:underline" href="/gallery">Gallery</a>
              <a className="hover:underline" href="/login">Login</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

