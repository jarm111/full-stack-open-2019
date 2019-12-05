import { gql } from 'apollo-boost'

export const GET_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const GET_FAVGENRE = gql`
  {
    me {
      favoriteGenre
    }
  }
`
