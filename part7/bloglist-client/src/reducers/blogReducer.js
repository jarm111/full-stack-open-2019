import blogService from '../services/blogs'

const INIT_BLOGS = 'INIT_BLOGS'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_BLOGS:
    return action.data
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs
    })
  }
}

export default blogReducer
