import axios from 'axios'

const baseUrl = `${BACKEND_URL}/api/users`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll }
