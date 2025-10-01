'use client'

import { useState, useEffect } from 'react'
import { Database } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Download, Share2, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

type Asset = Database['public']['Tables']['assets']['Row']

export function Gallery() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Not authenticated')
        setLoading(false)
        return
      }

      const response = await fetch('/api/assets', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setAssets(data.assets)
      } else {
        setError(data.error || 'Failed to fetch assets')
      }
    } catch {
      setError('Failed to fetch assets')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (asset: Asset) => {
    if (asset.storage_url) {
      window.open(asset.storage_url, '_blank')
    }
  }

  const handleShare = async (asset: Asset) => {
    if (navigator.share && asset.storage_url) {
      try {
        await navigator.share({
          title: `Generated with ${asset.model_name}`,
          text: asset.prompt || 'Check out this AI-generated content!',
          url: asset.storage_url,
        })
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(asset.storage_url || '')
      }
    } else if (asset.storage_url) {
      navigator.clipboard.writeText(asset.storage_url)
    }
  }

  const handleDelete = async (assetId: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return

    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        setAssets(assets.filter(asset => asset.id !== assetId))
      }
    } catch {
      console.error('Failed to delete asset')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading gallery...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchAssets} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="text-center p-8">
        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No assets yet
        </h3>
        <p className="text-gray-500">
          Generate some content to see it appear here
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <Card key={asset.id} className="overflow-hidden">
          <div className="aspect-square relative bg-gray-100">
            {asset.storage_url ? (
              <Image
                src={asset.storage_url}
                alt={asset.prompt || 'Generated content'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {asset.model_name}
                </Badge>
                <Badge 
                  variant={asset.status === 'completed' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {asset.status}
                </Badge>
              </div>
              
              {asset.prompt && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {asset.prompt}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(asset.created_at).toLocaleDateString()}</span>
                {asset.cost && (
                  <span>${asset.cost.toFixed(4)}</span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(asset)}
                  disabled={!asset.storage_url}
                  className="flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare(asset)}
                  disabled={!asset.storage_url}
                >
                  <Share2 className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(asset.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}