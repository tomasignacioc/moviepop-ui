import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './Login.css'
import { Toaster } from 'react-hot-toast';
import toastAlerts from '../services/toastAlerts'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({})

  const { auth, setAuth } = useContext(AuthContext)

  function handleInputchange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(loginData)
    })
      .then(res => {
        if (res.data.token) {
          setAuth({
            token: res.data.token,
            username: res.data.username
          })
        }
        toastAlerts(res.data)
      })
      .catch(err => toastAlerts(err.response.data))
  }

  return (
    <div className='login-container'>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Email: </label><input type="email" name='email' required onChange={handleInputchange} />
          <label>Contraseña: </label><input type="password" name='password' required onChange={handleInputchange} />
        </fieldset>
        <input type="submit" />
      </form>
      <p>¿No tienes una cuenta? <Link to='/signup' className='login-sign'>Regístrate</Link></p>
      <Toaster />
    </div>
  )
}

export default Login