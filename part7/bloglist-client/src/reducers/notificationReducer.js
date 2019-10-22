const initialState = {
  notifications: [],
  isVisible: false
}

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NOTIFICATION:
    return { notifications: state.notifications.concat(action.notification), isVisible: true }
  case CLEAR_NOTIFICATION:
    return { ...state, isVisible: false }
  default:
    return state
  }
}

const setNotification = notification => ({
  type: SET_NOTIFICATION,
  notification
})

const clearNotification = () => ({
  type: CLEAR_NOTIFICATION
})

let timeoutID = 0
export const notify = (message, type) => {
  return async dispatch => {
    dispatch(setNotification({ message, type }))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, 10000)
  }
}

export default notificationReducer
