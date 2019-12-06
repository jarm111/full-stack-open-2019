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

export const GET_BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
