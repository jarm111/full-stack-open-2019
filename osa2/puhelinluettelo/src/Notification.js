import React from 'react'
import './Notification.css'

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  const styleTypes = {
    success: 'notification-success',
    error: 'notification-error'
  }

  return (
    <div className={`notification ${styleTypes[type]}`}>
      {message}
    </div>
  )
}

export default Notification