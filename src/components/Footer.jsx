import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 space-y-2 sm:space-y-0">
        <div className="text-center sm:text-left">
          © 2025 Paypos™. All rights reserved.
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span>Version 1.0.0</span>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer