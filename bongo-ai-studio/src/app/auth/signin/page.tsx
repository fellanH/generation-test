import { AuthForm } from '@/components/auth/auth-form'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bongo AI Studio
          </h1>
          <p className="text-gray-600">
            Your AI Generative Studio
          </p>
        </div>
        <AuthForm mode="signin" />
      </div>
    </div>
  )
}