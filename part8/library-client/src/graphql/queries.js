import gql from 'graphql-tag'
import { BOOK_DETAILS } from './fragments'

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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`


export const GET_FAVGENRE = gql`
  {
    me {
      favoriteGenre
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
