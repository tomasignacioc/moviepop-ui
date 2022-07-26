import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './Login.css'

function Login({ setLogin, login }) {
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
    fetch("http://localhost:3001/auth/login", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(loginData)
    })
      .then(res => {
        //const authToken = res.headers.get("Auth-Token") // --> this line return null (?)
        return res.json()
      })
      .then(data => {
        setAuth({
          token: data.token,
          username: data.username
        })
        alert(`${data.message}`)
      })
  }
  console.log(auth);
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
      <p>¿No tienes una cuenta? <span onClick={() => setLogin(!login)} className="login-sign">Regístrate</span></p>
    </div>
  )
}

export default Login