import axios from 'axios'

const login = async (username, password) => {
  const response = await axios.post('/api/login', {
    username,
    password
  })

  if (response.status === 401) {
    throw new Error('Denied')
  }

  return response.data
}

export { login }
