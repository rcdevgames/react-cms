import React from 'react'
import { useAuth } from '@/hooks/useAuth'

const Settings = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Theme</label>
          <select className="bg-gray-700 text-white rounded px-3 py-2 w-full">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Notifications</label>
          <div className="flex items-center">
            <input type="checkbox" id="notifications" className="mr-2" />
            <label htmlFor="notifications" className="text-white">Enable email notifications</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Language</label>
          <select className="bg-gray-700 text-white rounded px-3 py-2 w-full">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings