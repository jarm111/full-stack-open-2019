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

const update = async (updated, token) => {
  const url = `${baseUrl}/${updated.id}`
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }

  const res = await axios.put(url, updated, config)
  return res.data
}

export default { getAll, create, update }
