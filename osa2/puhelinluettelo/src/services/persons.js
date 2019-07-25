import axios from 'axios'

const baseUri = 'http://localhost:3001/persons/'

const getPersons = () => {
  return axios
    .get(baseUri)
    .then(res => res.data)
}

const createPerson = (newPerson) => {
  return axios
    .post(baseUri, newPerson)
    .then(res => res.data)
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseUri}${id}`)
}

export default {
  getPersons,
  createPerson,
  deletePerson
}