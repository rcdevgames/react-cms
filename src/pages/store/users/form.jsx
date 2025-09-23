import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { storeService, userService } from '@/services'

const schema = yup.object().shape({
  Fullname: yup
    .string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  Email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address')
    .max(255, 'Email must not exceed 255 characters'),
  Password: yup
    .string()
    .when('$isEdit', {
      is: false,
      then: (schema) => schema
        .required('Password is required'),
      otherwise: (schema) => schema
        .optional()
    }),
  Phone: yup
    .string()
    .optional(),
  Address: yup
    .string()
    .optional()
    .max(500, 'Address must not exceed 500 characters'),
  branch_id: yup
    .string()
    .required('Branch is required')
    .min(1, 'Branch selection is required'),
  role_id: yup
    .string()
    .required('Role is required')
    .min(1, 'Role selection is required'),
  Remark: yup
    .string()
    .optional()
    .max(1000, 'Remark must not exceed 1000 characters')
})

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])
  const [branch, setBranch] = useState([])
  const [userDetail, setUserDetail] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit: handleFormSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    context: { isEdit: !!id },
    defaultValues: {
      Fullname: '',
      Email: '',
      Phone: '',
      Address: '',
      branch_id: '',
      role_id: '',
      Remark: ''
    }
  })

  const fetchUser = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await userService.getUser(id)
      setValue('Fullname', data.data.Fullname)
      setValue('Email', data.data.Email)
      setValue('Phone', data.data.Phone)
      setValue('Address', data.data.Address)
      setValue('branch_id', data.data.branch_id)
      setValue('role_id', data.data.role_id)
      setValue('Remark', data.data.Remark)
      setUserDetail(data.data)
    } catch (err) {
      console.error('Error fetching user:', err)
      setError('Failed to fetch user data')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const data = await userService.getRole({ perPage: 9999999, page: 1 })
      setRoles(data.data.rows)
    } catch (err) {
      console.error('Error fetching roles:', err)
      setError('Failed to fetch roles')
    }
  }

  const fetchBranch = async () => {
    try {
      const data = await storeService.getBranches({ perPage: 9999999, page: 1 })
      setBranch(data.data.rows)
    } catch (err) {
      console.error('Error fetching branches:', err)
      setError('Failed to fetch branches')
    }
  }

  useEffect(() => {
    fetchRoles()
    fetchBranch()
    if (id) {
      fetchUser()
    }
  }, [id])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      if (id) {
        // For edit mode, only send password if it's provided
        const updateData = { ...data }
        if (!updateData.Password || updateData.Password.trim() === '') {
          delete updateData.Password
        }
        await userService.updateUser(id, updateData)
      } else {
        await userService.createUser(data)
      }
      navigate('/store/users')
    } catch (err) {
      console.error('Error saving user:', err)
      setError(err.response?.data?.message || 'Failed to save user')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/store/users')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit User' : 'Create New User'}</h1>

      {isLoading && (
        <div className="mb-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading user data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit(onSubmit)} className={`max-w-4xl mx-auto ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="Email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="Email"
                id="Email"
                {...register("Email")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Email ? 'border-red-500' : ''
                  }`}
                placeholder='Masukan alamat email'
              />
              {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
            </div>

            {userDetail?.role_name !== "owner" && <div>
              <label htmlFor="role_id" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <select
                id="role_id"
                {...register("role_id")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.role_id ? 'border-red-500' : ''
                  }`}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.remark || role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && <p className="text-red-500 text-xs mt-1">{errors.role_id.message}</p>}
            </div>}
            
            {userDetail?.role_name === "owner" && <div>
              <label htmlFor="role_name" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <input
                type="text"
                id="role_name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={userDetail?.role_name === "owner" ? "Owner" : ""}
                readOnly
              />
            </div>}
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                    }`}
                  placeholder={id ? 'Biarkan kosong jika tidak ingin ubah password' : 'Masukan password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="branch_id" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
              <select
                id="branch_id"
                {...register("branch_id")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.branch_id ? 'border-red-500' : ''
                  }`}
              >
                <option value="">Select Branch</option>
                {branch.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              {errors.branch_id && <p className="text-red-500 text-xs mt-1">{errors.branch_id.message}</p>}
            </div>

          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="Fullname" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="Fullname"
                {...register("Fullname")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Fullname ? 'border-red-500' : ''
                  }`}
              />
              {errors.Fullname && <p className="text-red-500 text-xs mt-1">{errors.Fullname.message}</p>}
            </div>

            <div>
              <label htmlFor="Address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <textarea
                id="Address"
                {...register("Address")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Address ? 'border-red-500' : ''
                  }`}
                rows="2"
                placeholder='Jl. Merdeka No.123, Jakarta'
              />
              {errors.Address && <p className="text-red-500 text-xs mt-1">{errors.Address.message}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="Phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
              <input
                type="text"
                id="Phone"
                {...register("Phone")}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Phone ? 'border-red-500' : ''
                  }`}
                placeholder='08123456789'
              />
              {errors.Phone && <p className="text-red-500 text-xs mt-1">{errors.Phone.message}</p>}
            </div>

            <div>
              <label htmlFor="Remark" className="block text-gray-700 text-sm font-bold mb-2">Remark</label>
              <textarea
                id="Remark"
                {...register("Remark")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="2"
                placeholder='Catatan tambahan tentang user'
              />
              {errors.Remark && <p className="text-red-500 text-xs mt-1">{errors.Remark.message}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom right */}
        <div className="mt-8 flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-3"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`text-white font-bold py-2 px-4 rounded ${isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isLoading ? 'Loading...' : `${id ? 'Update' : 'Create'} User`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm