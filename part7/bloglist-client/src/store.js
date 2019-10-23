import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loginReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
