import { useState } from 'react';
import * as usersService from '../utilities/users-service';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()

  function handleChange(evt) {
      setFormData({...formData, [evt.target.name]: evt.target.value})
      setError('')
  }

  async function handleLogin(evt) {
      evt.preventDefault()
      try {
          const user = await usersService.login(formData)
          navigate("/")
          setUser(user)
      } catch {
          setError('Log In Failed - Try Again')
      }
    
  }

  return (
    <section className="login-form">
      {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
            <input onChange={handleChange} type="text" name="email" id="email" placeholder="Email" />
            <input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
            <button>Login</button>
        </form>
    </section>
  );
}