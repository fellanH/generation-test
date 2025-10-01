'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { AssetGrid } from '@/components/gallery/asset-grid'
import { AssetModal } from '@/components/gallery/asset-modal'
import { Asset } from '@/types'

export default function GalleryPage() {
  const router = useRouter()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
          <p className="text-gray-600 mt-2">
            View and manage your generated assets
          </p>
        </div>

        <AssetGrid onAssetClick={setSelectedAsset} />
        
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      </div>
    </div>
  )
}