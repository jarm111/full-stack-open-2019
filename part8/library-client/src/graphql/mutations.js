import { gql } from 'apollo-boost'

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: {
        name: $author
      },
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`
