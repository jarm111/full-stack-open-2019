import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const display = notification ? '' : 'none'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification)