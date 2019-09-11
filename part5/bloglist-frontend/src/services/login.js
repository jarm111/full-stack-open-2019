import axios from 'axios'

const baseUrl = '/api/login'

export default {
  login: async function(user) {
    const res = await axios.post(baseUrl, user)
    return res.data
  }
} 