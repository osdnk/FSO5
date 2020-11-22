import React, { useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const NewPost = ({ onAddBlog }) => {
  const [url, setUrl] = useState('google.com')
  const [title, setTitle] = useState('dave is cool')
  const [author, setAuthor] = useState('dave')
  const addPostRef = useRef()

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const onAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setTitle('')
    setUrl('')
    setAuthor('')
    onAddBlog({ url, title, author })
    addPostRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel={'add blog'} ref={addPostRef}>

      <form onSubmit={onSubmit}>
        <input
          id="title"
          placeholder="Title"
          onChange={onTitleChange}
          value={title}
        />
        <input id="url" placeholder="Url" onChange={onUrlChange} value={url} />
        <input id="author" placeholder="author" onChange={onAuthorChange} value={author} />
        <button id="submit" type="submit" className="add">
          Add
        </button>
      </form>
    </Togglable>
  )
}

NewPost.propTypes = {
  onAddBlog: PropTypes.func.isRequired,
}

export default NewPost
