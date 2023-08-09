import { useState } from 'react';
import { signUp } from '../utilities/users-service';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ setUser }) {

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()

  function handleChange(evt) {
      setFormData({...formData, [evt.target.name]: evt.target.value, error: ''})
  }

  async function handleSignUp(evt) {
      evt.preventDefault()
      try {
          delete formData.confirm
          delete formData.error
          const user = await signUp(formData)
          setUser(user)
          navigate('/')
      } catch {
          // An error occured 
          // Probably due to a duplicate email
          setFormData({ error: 'Sign Up Failed - Try Again' })
      }
  }

  const disable = formData.password !== formData.confirm

  return (
      <section className="signup-form">
          {error && <p>{error}</p>}
          <form onSubmit={handleSignUp}>
              <input onChange={handleChange} type="text" name="name" id="name" placeholder="Name" />
              <input onChange={handleChange} type="text" name="email" id="email" placeholder="Email" />
              <input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
              <input onChange={handleChange} type="password" name="confirm" id="confirm" placeholder="Confirm password" />
              <button disabled={disable}>Sign Up</button>
          </form>
          <p className="error-message">&nbsp;{formData.error}</p>
      </section>
  )
}