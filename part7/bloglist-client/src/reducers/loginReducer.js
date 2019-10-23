import loginService from '../services/login'
import { notify } from './notificationReducer'

const SET_USER = 'SET_USER'
const CLEAR_USER = 'CLEAR_USER'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case SET_USER:
    return action.data
  case CLEAR_USER:
    return null
  default:
    return state
  }
}

export const login = (username, password) => async dispatch => {
  try {
    const user = await loginService.login({ username, password })
    dispatch({
      type: SET_USER,
      data: user
    })
    dispatch(notify(`${user.name} logged in`, 'info'))
  } catch(err) {
    if (err.response.status === 401) {
      dispatch(notify('wrong username or password', 'error'))
    } else {
      dispatch(notify(`${err}`, 'error'))
    }
  }
}

export const logout = () => async (dispatch, getState) => {
  const { user } = getState()
  dispatch({
    type: CLEAR_USER,
  })
  dispatch(notify(`${user.name} logged out`, 'info'))
  loginService.clearPersistentLogin()
}

export const loginPersistent = () => async dispatch => {
  const persistentLogin = loginService.getPersistentLogin()
  if (persistentLogin) {
    dispatch({
      type: SET_USER,
      data: persistentLogin
    })
  }
}

export default loginReducer