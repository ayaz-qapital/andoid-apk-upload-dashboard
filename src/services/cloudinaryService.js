// Cloudinary service for handling large file uploads
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`

export const uploadToCloudinary = async (file, onProgress) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('resource_type', 'raw') // Important for APK files
  formData.append('folder', 'apk-uploads')

  try {
    const xhr = new XMLHttpRequest()
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total)
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          resolve({
            url: response.secure_url,
            public_id: response.public_id,
            bytes: response.bytes,
            format: response.format
          })
        } else {
          reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during Cloudinary upload'))
      })

      xhr.open('POST', CLOUDINARY_UPLOAD_URL)
      xhr.send(formData)
    })
  } catch (error) {
    throw new Error(`Cloudinary upload error: ${error.message}`)
  }
}

export const deleteFromCloudinary = async (publicId) => {
  // Note: Deletion requires server-side implementation with API secret
  // This is a placeholder for future implementation
  console.log('Delete from Cloudinary:', publicId)
}
