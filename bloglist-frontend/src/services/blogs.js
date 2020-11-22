import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const addBlog = async (blog) => {
  const { token } = JSON.parse(localStorage.getItem('login-data'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios.post(baseUrl, blog, config)
}

const updateBlog = async (blog) => {
  const { token } = JSON.parse(localStorage.getItem('login-data'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios.put(`${baseUrl}/${blog.id}`, blog, config)
}

const removeBlog = async (blog) => {
  const { token } = JSON.parse(localStorage.getItem('login-data'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, addBlog, updateBlog, removeBlog }
