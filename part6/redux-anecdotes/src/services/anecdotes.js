import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async content => {
  const item = { content, votes: 0}
  const res = await axios.post(baseUrl, item)
  return res.data
}

const update = async (id, updatedItem) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedItem)
  return res.data
}

export default { getAll, createNew, update }
