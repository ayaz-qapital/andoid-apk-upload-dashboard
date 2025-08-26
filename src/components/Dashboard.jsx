import React from 'react'
import { Trash2, Copy, ExternalLink, Clock, CheckCircle, XCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = ({ uploads, onDelete, onUpdate }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('App URL copied to clipboard!')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (uploads.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No uploads yet</h3>
          <p className="text-gray-600">Upload your first APK file to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Upload History</h2>
        <div className="text-sm text-gray-600">
          {uploads.length} upload{uploads.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="glass-effect rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-center space-x-3">
                  {getStatusIcon(upload.status)}
                  <h3 className="font-semibold text-gray-800 text-lg">{upload.fileName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                    {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">File Size:</span>
                    <span className="ml-2 font-medium">{formatFileSize(upload.fileSize)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="ml-2 font-medium">{formatTimestamp(upload.timestamp)}</span>
                  </div>
                  {upload.browserStackId && (
                    <div>
                      <span className="text-gray-500">BrowserStack ID:</span>
                      <span className="ml-2 font-medium font-mono text-xs">{upload.browserStackId}</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {upload.status === 'uploading' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{upload.statusMessage || 'Uploading...'}</span>
                      <span className="font-medium">{upload.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* App URL */}
                {upload.appUrl && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 mb-1">App URL Ready</p>
                        <p className="font-mono text-sm text-green-700 break-all">{upload.appUrl}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => copyToClipboard(upload.appUrl)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <a
                          href={upload.appUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                          title="Open URL"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {upload.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-800 mb-1">Upload Failed</p>
                    <p className="text-sm text-red-700">{upload.error}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="ml-4">
                <button
                  onClick={() => onDelete(upload.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete upload"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
