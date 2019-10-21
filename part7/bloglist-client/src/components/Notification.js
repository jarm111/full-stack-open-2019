import React from 'react'
import { connect } from 'react-redux'
import './Notification.css'

const Notification = ({ notification, isVisible }) => {
  if (!isVisible) return null
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
  const notifications = state.notification.notifications
  return {
    notification: notifications[notifications.length - 1],
    isVisible: state.notification.isVisible
  }
}

export default connect(mapStateToProps)(Notification)

