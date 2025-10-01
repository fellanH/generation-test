export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold">Bongo</h1>
        <p className="mt-3 text-gray-600">AI Generative Studio for Fal.ai models and workflows.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <a href="/auth/login" className="px-4 py-2 rounded bg-black text-white">Log in</a>
          <a href="/auth/signup" className="px-4 py-2 rounded border">Sign up</a>
        </div>
      </div>
    </main>
  )
}

