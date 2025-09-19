import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div>
          © 2024 AdminPro. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <span>Version 1.0.0</span>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer