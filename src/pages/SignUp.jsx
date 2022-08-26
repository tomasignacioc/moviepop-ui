import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'
import { Toaster } from 'react-hot-toast';
import toastAlerts from '../services/toastAlerts'
import axios from 'axios';

function SignUp() {
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
    await axios({
      method: 'POST',
      url: '/auth/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    })
      .then(res => toastAlerts(res.data))
      .catch(err => toastAlerts(err.response.data))

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
      <p>¿Ya tienes cuenta? <Link to='/login' className="login-sign">Inicia sesión</Link></p>
      <Toaster />
    </div>
  )
}

export default SignUp