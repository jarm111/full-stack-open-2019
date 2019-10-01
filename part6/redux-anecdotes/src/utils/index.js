import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutID = 0

export const notify = (message, store) => {
  store.dispatch(setNotification(message))
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    store.dispatch(clearNotification())
  }, 5000)
}
