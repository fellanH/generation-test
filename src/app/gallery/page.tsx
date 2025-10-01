import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Gallery from '@/components/gallery/Gallery'

export default function GalleryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Gallery</h1>
            <p className="text-gray-600 mt-2">
              All your generated assets are permanently stored here
            </p>
          </div>

          <Gallery />
        </main>
      </div>
    </ProtectedRoute>
  )
}
