import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const useUpdate = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user,dispatch } = useAuthContext()

  const update = async ( dob, fname, age, mobile) => {
    setIsLoading(true)
    setError(null)
    const data = {
      fname,
      dob,
      age,
      mobile
    }

    console.log(JSON.stringify(data))
    const response = await fetch('https://mern-backend-o7vi.onrender.com/api/user/update', {
      method: 'POST',
      headers: {'Authorization' : `Bearer ${user.token}`,
                'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // update loading state
      setIsLoading(false)
    }
  }

  return { update, isLoading, error }
}