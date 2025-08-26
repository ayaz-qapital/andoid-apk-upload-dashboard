import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import UploadZone from './components/UploadZone'
import Dashboard from './components/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [uploads, setUploads] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load uploads from localStorage on component mount
  useEffect(() => {
    const savedUploads = localStorage.getItem('apk-uploads')
    if (savedUploads) {
      setUploads(JSON.parse(savedUploads))
    }
  }, [])

  // Save uploads to localStorage whenever uploads change
  useEffect(() => {
    localStorage.setItem('apk-uploads', JSON.stringify(uploads))
  }, [uploads])

  const addUpload = (uploadData) => {
    const newUpload = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...uploadData
    }
    setUploads(prev => [newUpload, ...prev])
  }

  const updateUpload = (id, updates) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id ? { ...upload, ...updates } : upload
    ))
  }

  const deleteUpload = (id) => {
    setUploads(prev => prev.filter(upload => upload.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            APK Upload Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your APK files and get instant BrowserStack app URLs for automated testing
          </p>
        </div>

        <UploadZone 
          onUpload={addUpload}
          onUpdateUpload={updateUpload}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <Dashboard 
          uploads={uploads}
          onDelete={deleteUpload}
          onUpdate={updateUpload}
        />
      </main>

      {isLoading && <LoadingSpinner />}
    </div>
  )
}

export default App
