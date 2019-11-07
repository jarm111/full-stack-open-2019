import userService from '../services/users'
import { notify } from './notificationReducer'

const INIT_USERS = 'INIT_USERS'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_USERS:
    return action.data
  default: 
    return state
  }
}

export const initUsers = () => async dispatch => {
  try {
    const users = await userService.getAll()
    dispatch({
      type: INIT_USERS,
      data: users
    })
  } catch(err) {
    dispatch(notify(`${err}`, 'error'))
  }
}

export default userReducer
