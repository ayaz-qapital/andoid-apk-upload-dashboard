import axios from 'axios'

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'apk_uploads'

export const uploadToCloudinary = async (file, onProgress) => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY) {
    throw new Error('Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_API_KEY environment variables.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('resource_type', 'raw') // For non-image files like APK
  formData.append('folder', 'apk-uploads')

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      }
    )

    return {
      url: response.data.secure_url,
      public_id: response.data.public_id,
      bytes: response.data.bytes,
      format: response.data.format,
      success: true
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    
    if (error.response) {
      const errorMessage = error.response.data?.error?.message || `HTTP ${error.response.status}: ${error.response.statusText}`
      throw new Error(`Cloudinary upload failed: ${errorMessage}`)
    } else if (error.request) {
      throw new Error('Network error: Unable to reach Cloudinary')
    } else {
      throw new Error(error.message || 'Unknown error occurred during Cloudinary upload')
    }
  }
}

// Download file from Cloudinary URL
export const downloadFromCloudinary = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Cloudinary download error:', error)
    throw new Error('Failed to download file from Cloudinary')
  }
}
