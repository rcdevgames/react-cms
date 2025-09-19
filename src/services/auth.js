// This is a mock implementation. Replace with actual API calls in a real application.
export async function loginAPI(email, password) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (email === 'admin@example.com' && password === 'password') {
    return {
      user: { id: 1, email, name: 'Admin User' },
      accessToken: 'mock-access-token',
      csrfToken: 'mock-csrf-token',
    }
  } else {
    throw new Error('Invalid credentials')
  }
}