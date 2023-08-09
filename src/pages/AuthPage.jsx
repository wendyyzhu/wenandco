import { useState } from 'react';
import './AuthPage.css';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm';

export default function AuthPage({ setUser }) {
  
  const [login, setLogin] = useState(true)

  function handleLoginForm(evt) {
    evt.preventDefault()
    setLogin(true)
  }

  function handleSignUpForm(evt) {
    evt.preventDefault()
    setLogin(false)
  }

  return (
    <main className="auth-page">
      <div>
        <a href="" onClick={handleLoginForm}>Login</a>
            &nbsp; | &nbsp;
        <a href="" onClick={handleSignUpForm}>Sign Up</a>
        <p>If you don't have an account, please sign up.</p>
      </div>
      {login ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </main>
  );
}