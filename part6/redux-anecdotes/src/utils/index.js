import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutID = 0
let store = null

export const setStore = storeRef => {
  store = storeRef
  console.log('call setStore', store)
}

export const notify = (message) => {
  store.dispatch(setNotification(message))
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    store.dispatch(clearNotification())
  }, 5000)
}
