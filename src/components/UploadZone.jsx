import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, CheckCircle, Cloud } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadToBrowserStackFromUrl } from '../services/browserStackService'
import { uploadToCloudinary } from '../services/cloudinaryService'

const UploadZone = ({ onUpload, onUpdateUpload, isLoading, setIsLoading }) => {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error('Please upload only APK files')
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    setIsLoading(true)
    
    // Create initial upload record
    const uploadId = Date.now()
    const initialUpload = {
      id: uploadId,
      fileName: file.name,
      fileSize: file.size,
      status: 'uploading',
      progress: 0,
      appUrl: null,
      cloudinaryUrl: null,
      error: null
    }
    
    onUpload(initialUpload)
    toast.loading(`Uploading ${file.name} to Cloudinary...`, { id: uploadId })

    try {
      // Step 1: Upload to Cloudinary first
      onUpdateUpload(uploadId, { status: 'uploading-cloudinary', progress: 0 })
      
      const cloudinaryResult = await uploadToCloudinary(file, (progress) => {
        onUpdateUpload(uploadId, { progress: Math.round(progress * 0.7) }) // 70% for Cloudinary
      })

      onUpdateUpload(uploadId, { 
        cloudinaryUrl: cloudinaryResult.url,
        progress: 70
      })

      toast.loading(`Uploading to BrowserStack...`, { id: uploadId })

      // Step 2: Upload to BrowserStack from Cloudinary URL
      onUpdateUpload(uploadId, { status: 'uploading-browserstack' })
      
      const browserStackResult = await uploadToBrowserStackFromUrl(cloudinaryResult.url, (progress) => {
        onUpdateUpload(uploadId, { progress: 70 + Math.round(progress * 0.3) }) // 30% for BrowserStack
      })

      // Update with success
      onUpdateUpload(uploadId, {
        status: 'completed',
        progress: 100,
        appUrl: browserStackResult.app_url,
        browserStackId: browserStackResult.app_id
      })

      toast.success(`Upload completed! App URL: ${browserStackResult.app_url}`, { id: uploadId })
    } catch (error) {
      console.error('Upload failed:', error)
      onUpdateUpload(uploadId, {
        status: 'failed',
        error: error.message
      })
      toast.error(`Upload failed: ${error.message}`, { id: uploadId })
    } finally {
      setIsLoading(false)
    }
  }, [onUpload, onUpdateUpload, setIsLoading])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.android.package-archive': ['.apk']
    },
    maxFiles: 1,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`upload-zone ${isDragActive || dragActive ? 'active' : ''} ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {isDragActive ? 'Drop your APK file here' : 'Upload APK File'}
            </h3>
            <p className="text-gray-600">
              Drag and drop your APK file here, or click to browse
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>APK files only</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Max 100MB</span>
            </div>
          </div>
          
          {!isLoading && (
            <button className="mx-auto block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Choose File
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Cloud className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Cloudinary + BrowserStack Integration</p>
            <p>Large APK files are uploaded to Cloudinary first, then processed by BrowserStack for app URL generation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadZone
