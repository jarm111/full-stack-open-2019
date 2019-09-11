import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, create }
