import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewPost from './components/NewPost'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState()

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('login-data'))

    if (loginData) {
      setUser(loginData)
    }
  }, [])

  const onLogin = data => {
    localStorage.setItem('login-data', JSON.stringify(data))
    setUser(data)
  }

  const onLogout = () => {
    localStorage.removeItem('login-data')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const onAddBlog = async blog => {
    const response = await blogService.addBlog(blog)
    setMessage({ message: 'Added a blog!', positive: true })
    setBlogs(blogs => [...blogs, { ...response.data, user }])
  }

  const updateBlog = async blog => {
    const reponse = await blogService.updateBlog(blog)
    setBlogs(blogs => [...blogs.filter(e => e.id !== blog.id), { ...reponse.data, user }])
  }

  const deleteBlog = async (blog) => {
    await blogService.removeBlog(blog)
    setBlogs(blogs => [...blogs.filter(e => e.id !== blog.id)])

  }

  return (
    <div>
      <Message {...message}/>
      {user === null ?
        <Login
          setMessage={setMessage}
          onLogin={onLogin}
        />
        :
        <>
          <h2>blogs</h2>
          <NewPost onAddBlog={onAddBlog}/>
          {user.name} logged in <button onClick={onLogout}>log out</button>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
          )}
        </>
      }
    </div>
  )
}

export default App
