import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)


  const onDelete = () => {
    if (window.confirm('Are you surely want to remove this blog?')) {
      deleteBlog(blog)
    }
  }

  const like = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }


  return (
    <div
      className="blog-wrapper"
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <strong className="title">{blog.title}</strong>
        <span className="author" style={{ marginLeft: 12 }}>
          {blog.author}
        </span>
        <button onClick={() => setExpanded(!expanded)} className="expand" style={{ marginLeft: 12 }}>
          {expanded ? 'Hide' : 'View'}
        </button>
      </div>
      {expanded && (
        <div>
          <p className="likes">
            <strong>Likes:</strong> {blog.likes}
          </p>
          <p className="url">
            <strong>URL:</strong>{blog.url}
          </p>
          <button onClick={like} className="like">Like</button>
          a: {blog.user.username}
          b: {user.username}
          {blog.user.username === user.username && (
            <button style={{ margin: 6 }} className="delete" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}


export default Blog
