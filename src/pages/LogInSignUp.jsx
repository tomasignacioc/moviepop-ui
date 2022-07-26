import React, { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import NavBar from '../layouts/NavBar'

import './LogInSignUp.css'

function LogInSignUp() {
  const [login, setLogin] = useState(true)
  return (
    <main className='loginsignup-container'>
      <NavBar />
      {login ? <Login setLogin={setLogin} login={login} /> : <SignUp setLogin={setLogin} login={login} />}
    </main>
  )
}

export default LogInSignUp