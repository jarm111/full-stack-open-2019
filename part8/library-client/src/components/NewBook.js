import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_BOOK } from '../graphql/mutations'
import { GET_AUTHORS } from '../graphql/queries'
import { GET_BOOKS } from '../graphql/queries'
import { GET_BOOKS_BY_GENRE } from '../graphql/queries'

const NewBook = ({ onNewBook }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    // onError: handleError,
    refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
    update: (store, response) => {
      response.data.addBook.genres.forEach(genre => {
        const dataInStore = store.readQuery({ query: GET_BOOKS_BY_GENRE, variables: { genre } })
        dataInStore.allBooks = dataInStore.allBooks.concat(response.data.addBook)
        store.writeQuery({ 
          query: GET_BOOKS_BY_GENRE, 
          variables: { genre },
          data: dataInStore
        })
      })
    }
  })

  const submit = async (e) => {
    e.preventDefault()

    await addBook({
      variables: { title, author, published: parseInt(published), genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    onNewBook()
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook