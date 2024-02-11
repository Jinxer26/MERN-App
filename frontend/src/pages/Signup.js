import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password!==confirmpassword){
      alert("Passwords Don't Match ")
    }
    await signup(email, password, name)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Name :</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmpassword} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup