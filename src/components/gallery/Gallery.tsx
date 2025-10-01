'use client'

import { useState } from 'react'
import useSWR from 'swr'
import AssetCard from './AssetCard'
import type { Asset } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Gallery() {
  const [deletedAssets, setDeletedAssets] = useState<Set<string>>(new Set())
  
  const { data, error, isLoading } = useSWR<{ assets: Asset[] }>(
    '/api/assets/list',
    fetcher,
    { refreshInterval: 10000 }
  )

  const handleDelete = (assetId: string) => {
    setDeletedAssets(prev => new Set([...prev, assetId]))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load gallery</p>
      </div>
    )
  }

  const assets = data?.assets?.filter(asset => !deletedAssets.has(asset.id)) || []

  if (assets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No assets yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Generate your first asset to see it here
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {assets.map(asset => (
        <AssetCard key={asset.id} asset={asset} onDelete={handleDelete} />
      ))}
    </div>
  )
}
