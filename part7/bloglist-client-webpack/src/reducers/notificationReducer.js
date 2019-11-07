const SET_NOTIFICATION = 'SET_NOTIFICATION'

const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case SET_NOTIFICATION:
    return state.concat(action.data)
  default:
    return state
  }
}

export const notify = (message, type) => ({
  type: SET_NOTIFICATION,
  data: { message, type }
})

export default notificationReducer
