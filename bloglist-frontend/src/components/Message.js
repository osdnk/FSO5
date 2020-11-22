import React from 'react'
import './index.css'
import PropTypes from 'prop-types'

const Message = ({ message, positive }) => {
  return message ? <div className={`message${positive ? ' positive' : ' negative'}`}>{message}</div> : null
}

Message.propTypes = {
  message: PropTypes.string,
  positive: PropTypes.bool,
}


export default Message
