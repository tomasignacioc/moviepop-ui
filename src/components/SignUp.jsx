import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp({ setLogin, login }) {
  const [formData, setFormData] = useState({})
  let navigate = useNavigate();

  function handleInputchange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch("http://localhost:3001/auth/register", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(`${data.message}`)
      })

    navigate("/login", { replace: true });
  }
  return (
    <div className='signup-container'>
      <h1>Formulario de registro</h1>
      <p>Por favor completar todos los campos</p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Nombre de usuario: </label><input type="text" name='username' required onChange={handleInputchange} />
          <label>Email: </label><input type="email" name='email' required onChange={handleInputchange} />
          <label>Contraseña: </label><input type="password" name='password' required onChange={handleInputchange} />
        </fieldset>
        <input type="submit" />
      </form>
      <p>¿Ya tienes cuenta? <span onClick={() => setLogin(!login)} className="login-sign">Inicia sesión</span></p>
    </div>
  )
}

export default SignUp