const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

let timeoutID = 0
export const setNotification = (message, activeSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: ''
      })
    }, activeSeconds * 1000)
  }
}

export default notificationReducer