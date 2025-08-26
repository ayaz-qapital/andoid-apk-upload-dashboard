import axios from 'axios'
import { uploadToCloudinary, downloadFromCloudinary } from './cloudinaryService'

// BrowserStack API configuration
const BROWSERSTACK_API_URL = 'https://api-cloud.browserstack.com/app-automate/upload'

export const uploadToBrowserStack = async (file, onProgress) => {
  // Get credentials from environment variables
  const username = import.meta.env.VITE_BROWSERSTACK_USERNAME
  const accessKey = import.meta.env.VITE_BROWSERSTACK_ACCESS_KEY

  if (!username || !accessKey) {
    throw new Error('BrowserStack credentials not configured. Please set VITE_BROWSERSTACK_USERNAME and VITE_BROWSERSTACK_ACCESS_KEY environment variables.')
  }

  try {
    let fileToUpload = file
    let cloudinaryUrl = null

    // For large files (>50MB), upload to Cloudinary first
    if (file.size > 50 * 1024 * 1024) {
      onProgress(0, 'Uploading to Cloudinary...')
      
      const cloudinaryResult = await uploadToCloudinary(file, (progress) => {
        onProgress(Math.round(progress * 0.5), 'Uploading to Cloudinary...')
      })
      
      cloudinaryUrl = cloudinaryResult.url
      onProgress(50, 'Downloading from Cloudinary...')
      
      // Download the file from Cloudinary to upload to BrowserStack
      const blob = await downloadFromCloudinary(cloudinaryUrl)
      fileToUpload = new File([blob], file.name, { type: file.type })
      
      onProgress(60, 'Uploading to BrowserStack...')
    } else {
      onProgress(0, 'Uploading to BrowserStack...')
    }

    // Create FormData for BrowserStack upload
    const formData = new FormData()
    formData.append('file', fileToUpload)

    const response = await axios.post(BROWSERSTACK_API_URL, formData, {
      auth: {
        username: username,
        password: accessKey
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const baseProgress = file.size > 50 * 1024 * 1024 ? 60 : 0
          const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          const finalProgress = baseProgress + Math.round(uploadProgress * (file.size > 50 * 1024 * 1024 ? 0.4 : 1))
          onProgress(finalProgress, 'Uploading to BrowserStack...')
        }
      }
    })

    // BrowserStack returns the app URL and app ID
    if (response.data && response.data.app_url) {
      return {
        app_url: response.data.app_url,
        app_id: response.data.app_id || response.data.hashed_id,
        cloudinary_url: cloudinaryUrl,
        success: true
      }
    } else {
      throw new Error('Invalid response from BrowserStack API')
    }
  } catch (error) {
    console.error('Upload error:', error)
    
    if (error.response) {
      // API returned an error response
      const errorMessage = error.response.data?.error || error.response.data?.message || `HTTP ${error.response.status}: ${error.response.statusText}`
      throw new Error(`Upload Error: ${errorMessage}`)
    } else if (error.request) {
      // Network error
      throw new Error('Network error: Unable to reach upload service')
    } else {
      // Other error
      throw new Error(error.message || 'Unknown error occurred during upload')
    }
  }
}

// Utility function to validate APK file
export const validateApkFile = (file) => {
  const maxSize = 100 * 1024 * 1024 // 100MB
  const allowedTypes = ['application/vnd.android.package-archive']
  
  if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.apk')) {
    throw new Error('Please select a valid APK file')
  }
  
  if (file.size > maxSize) {
    throw new Error('File size must be less than 100MB')
  }
  
  return true
}
