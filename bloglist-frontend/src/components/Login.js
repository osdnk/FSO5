import React, { useState } from 'react'
import { login as loginApi } from './../services/login'
import PropTypes from 'prop-types'

const Login = ({ onLogin, setMessage }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onLoginChange = (event) => {
    setLogin(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await loginApi(login, password)
      onLogin(response)
      setMessage({ message: 'hey, logged in!', positive: true })
    } catch (error) {
      setMessage({ message: 'Invalid login and password!', positive: false })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      Username
      <input
        id="login"
        onChange={onLoginChange}
        value={login}
      />
      password
      <input
        id="password"
        type="current-password"
        onChange={onPasswordChange}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
}


export default Login
