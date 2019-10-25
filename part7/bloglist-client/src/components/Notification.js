import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import usePrevious from '../hooks/usePrevious'
import './Notification.css'

const Notification = ({ notification }) => {
  const [isVisible, setVisibility] = useState(false)
  const prevNotification = usePrevious(notification)
  const timeoutID = useRef(0)

  const showNotification = () => {
    if (!isVisible) {
      setVisibility(true)
    }
    clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => {
      setVisibility(false)
    }, 10000)
  }

  if (notification !== prevNotification) {
    showNotification()
  }

  if (!isVisible) {
    return null
  }

  const { message, type } = notification

  const styleTypes = {
    info: 'notification-info',
    error: 'notification-error'
  }

  return (
    <div className={`notification ${styleTypes[type]}`}>
      {message}
    </div>
  )
}

const mapStateToProps = state => {
  const { notifications } = state
  return {
    notification: notifications[notifications.length - 1]
  }
}

export default connect(mapStateToProps)(Notification)

