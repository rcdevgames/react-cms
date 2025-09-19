import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Name</label>
          <p className="text-white">{user.name || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email</label>
          <p className="text-white">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Role</label>
          <p className="text-white">{user.role || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile