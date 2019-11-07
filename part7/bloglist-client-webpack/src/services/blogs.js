import axios from 'axios'

const baseUrl = `${BACKEND_URL}/api/blogs`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (updated, token) => {
  const url = `${baseUrl}/${updated.id}`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const res = await axios.put(url, updated, config)
  return res.data
}

const remove = async (blog, token) => {
  const url = `${baseUrl}/${blog.id}`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  await axios.delete(url, config)
}

const addComment = async (blog, comment) => {
  const url =`${baseUrl}/${blog.id}/comments`
  const res = await axios.post(url, { content: comment })
  return res.data
}

export default { getAll, create, update, remove, addComment }
