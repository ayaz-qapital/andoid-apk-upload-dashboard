import React from 'react'
import { Smartphone, Upload, Activity } from 'lucide-react'

const Header = () => {
  return (
    <header className="glass-effect shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">APK Dashboard</h1>
              <p className="text-sm text-gray-600">BrowserStack Integration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload & Test</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Real-time Status</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
