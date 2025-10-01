'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Share, Eye, Trash2 } from 'lucide-react'
import { formatDate, formatFileSize, downloadFile } from '@/lib/utils'
import { Asset } from '@/types'

interface AssetGridProps {
  onAssetClick?: (asset: Asset) => void
}

export function AssetGrid({ onAssetClick }: AssetGridProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async (pageNum = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/assets?page=${pageNum}&limit=20`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch assets')
      }

      const data = await response.json()
      
      if (pageNum === 1) {
        setAssets(data.assets)
      } else {
        setAssets(prev => [...prev, ...data.assets])
      }
      
      setHasMore(data.pagination.page < data.pagination.totalPages)
      setPage(pageNum)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchAssets(page + 1)
    }
  }

  const handleDownload = (asset: Asset) => {
    downloadFile(asset.publicUrl, `${asset.id}.${asset.fileType.split('/')[1]}`)
  }

  const handleShare = async (asset: Asset) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Asset',
          text: asset.prompt,
          url: asset.publicUrl,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(asset.publicUrl)
      alert('Link copied to clipboard!')
    }
  }

  if (loading && assets.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading assets: {error}</p>
        <Button onClick={() => fetchAssets()}>Retry</Button>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No assets yet</h3>
        <p className="text-gray-600 mb-6">
          Start generating content to see your assets here
        </p>
        <Button onClick={() => window.location.href = '/generate'}>
          Generate Your First Asset
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
              <img
                src={asset.publicUrl}
                alt={asset.prompt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => onAssetClick?.(asset)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAssetClick?.(asset)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                  {asset.prompt}
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Model: {asset.modelName}</p>
                  <p>Size: {asset.width}×{asset.height}</p>
                  <p>File: {formatFileSize(asset.fileSize)}</p>
                  <p>Created: {formatDate(asset.createdAt)}</p>
                </div>
                
                <div className="flex gap-1 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(asset)}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(asset)}
                  >
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}