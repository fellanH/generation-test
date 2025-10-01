import Link from 'next/link'
import { Sparkles, Zap, Shield, Database } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-20 h-20 text-primary-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Bongo AI Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The premier user-friendly web interface for Fal.ai models. 
            Generate stunning images and videos with persistent asset management.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Zap className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast Generation
            </h3>
            <p className="text-gray-600 text-sm">
              Lightning-fast AI model execution with real-time status updates
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Database className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Permanent Storage
            </h3>
            <p className="text-gray-600 text-sm">
              Your generated assets are permanently stored and always accessible
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 text-sm">
              Your creations are private by default with secure authentication
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Sparkles className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Multiple Models
            </h3>
            <p className="text-gray-600 text-sm">
              Access to curated Fal.ai models for images, videos, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
