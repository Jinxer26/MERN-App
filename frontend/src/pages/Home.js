import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
import { useUpdate } from "../hooks/useUpdate"

const Home = () => {
  const { user } = useAuthContext()
  const [dob, setDob] = useState('')
  const [fname, setFname] = useState('')
  const [age, setAge] = useState('')
  const [mobile, setMobile] = useState('')
  const {update} = useUpdate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (dob===""){
      setDob(user.dob)
    }
    if (fname===""){
      setFname(user.fname)
    }
    if (age===""){
      setAge(user.age)
    }
    if (mobile===""){
      setMobile(user.mobile)
    }
    await update(dob, fname, age, mobile)
  }

    return (
    <div className="home">
      {!user && (
        <h1>Home Page</h1>
      )}
      {user && (
        <div>
          <h1>You logged in !</h1>
          <label>Name:</label>
              <input 
              placeholder={user.fname} 
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              />
            <label>Date of birth:</label>
              <input 
              placeholder={user.dob}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              />
            
            <label>Age:</label>
              <input 
              placeholder={user.age}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              />
          
            <label>Mobile:</label>
              <input 
              placeholder={user.mobile}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              />
       
            <button onClick={handleUpdate}>Update Details</button>
        </div>
      )}
      
    </div>
  )
}

export default Home