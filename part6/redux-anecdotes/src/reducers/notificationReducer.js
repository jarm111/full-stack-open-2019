const defaultMessage = 'Hello, this is default notification message!'

const notificationReducer = (state = defaultMessage, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const notify = message => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export default notificationReducer