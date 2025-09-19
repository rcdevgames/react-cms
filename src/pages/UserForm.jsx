import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', role: 'User' })

  useEffect(() => {
    if (id) {
      // Fetch user data if editing an existing user
      // For now, we'll use dummy data
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' })
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement form submission logic here
    console.log('Submitting user:', user)
    navigate('/dashboard/users')
  }

  const handleReset = () => {
    if (id) {
      // Reset to original user data if editing
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' })
    } else {
      // Reset to empty form if creating new user
      setUser({ name: '', email: '', role: 'User' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit User' : 'Create New User'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select
            id="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {id ? 'Update' : 'Create'} User
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm