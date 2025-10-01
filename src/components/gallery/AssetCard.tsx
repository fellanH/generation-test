'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Share2, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Asset } from '@/types'
import toast from 'react-hot-toast'

interface AssetCardProps {
  asset: Asset
  onDelete?: (assetId: string) => void
}

export default function AssetCard({ asset, onDelete }: AssetCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(asset.storage_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bongo-${asset.id}.${asset.asset_type === 'image' ? 'png' : 'mp4'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Asset downloaded!')
    } catch (error) {
      toast.error('Failed to download asset')
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(asset.storage_url)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this asset?')) return
    
    setIsDeleting(true)
    try {
      // Call delete API
      const response = await fetch(`/api/assets/${asset.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast.success('Asset deleted!')
      onDelete?.(asset.id)
    } catch (error) {
      toast.error('Failed to delete asset')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      {/* Asset Preview */}
      <div className="relative aspect-square bg-gray-100">
        {asset.asset_type === 'image' ? (
          <Image
            src={asset.storage_url}
            alt="Generated asset"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <video
            src={asset.storage_url}
            controls
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleDownload}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Asset Info */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="capitalize">{asset.asset_type}</span>
          {asset.width && asset.height && (
            <span>{asset.width}x{asset.height}</span>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {formatDistanceToNow(new Date(asset.created_at), { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}
