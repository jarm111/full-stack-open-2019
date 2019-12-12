import { GET_BOOKS } from '../graphql/queries'
import { GET_BOOKS_BY_GENRE } from '../graphql/queries'

export const addBookToCache = (client, newBook) => {
  const { allBooks } = client.readQuery({ query: GET_BOOKS })
  const exists = allBooks.map(book => book.id).includes(newBook.id)
  if (!exists) {
    client.writeQuery({ 
      query: GET_BOOKS, 
      data: {
        allBooks: allBooks.concat(newBook)
      }
    })

    newBook.genres.forEach(genre => {
      const { allBooks: booksOfGenre } = client.readQuery({ query: GET_BOOKS_BY_GENRE, variables: { genre } })
      client.writeQuery({ 
        query: GET_BOOKS_BY_GENRE, 
        variables: { genre },
        data: {
          allBooks: booksOfGenre.concat(newBook)
        }
      })
    })
  }
}