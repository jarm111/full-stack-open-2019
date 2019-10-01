import React from 'react'

const Notification = ({ store }) => {
  const message = store.getState().notification
  const display = message ? '' : 'none'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display
  }

  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification