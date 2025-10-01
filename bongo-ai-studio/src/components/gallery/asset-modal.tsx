'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Download, Share, Copy } from 'lucide-react'
import { formatDate, formatFileSize, downloadFile } from '@/lib/utils'
import { Asset } from '@/types'

interface AssetModalProps {
  asset: Asset | null
  onClose: () => void
}

export function AssetModal({ asset, onClose }: AssetModalProps) {
  const [copied, setCopied] = useState(false)

  if (!asset) return null

  const handleDownload = () => {
    downloadFile(asset.publicUrl, `${asset.id}.${asset.fileType.split('/')[1]}`)
  }

  const handleShare = async () => {
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
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(asset.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Asset Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image */}
            <div className="space-y-4">
              <img
                src={asset.publicUrl}
                alt={asset.prompt}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              
              <div className="flex gap-2">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Share'}
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">{asset.prompt}</p>
                  <Button variant="outline" size="sm" onClick={copyPrompt}>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Prompt
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span className="font-medium">{asset.modelName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium">{asset.width}×{asset.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-medium">{formatFileSize(asset.fileSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Type:</span>
                    <span className="font-medium">{asset.fileType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{formatDate(asset.createdAt)}</span>
                  </div>
                  {asset.cost && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium">${asset.cost.toFixed(4)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {asset.parameters && Object.keys(asset.parameters).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {Object.entries(asset.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="font-medium">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}