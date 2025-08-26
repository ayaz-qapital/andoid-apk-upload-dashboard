import React from 'react'
import { Loader } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <Loader className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="text-gray-700 font-medium">Processing upload...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
