import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-md py-12">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow">
        {children}
      </div>
    </div>
  );
}
