import axios from 'axios'

const baseUri = '/api/persons'

const getAll = () => {
  return axios
    .get(baseUri)
    .then(res => res.data)
}

const create = (newPerson) => {
  return axios
    .post(baseUri, newPerson)
    .then(res => res.data)
}

const remove = (id) => {
  return axios
    .delete(`${baseUri}/${id}`)
}

const update = (id, changedPerson) => {
  return axios
    .put(`${baseUri}/${id}`, changedPerson)
    .then(res => res.data)
}

export default {
  getAll,
  create,
  remove,
  update
}