import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/react-hooks'
import { readToken, clearStorage } from './utils/localStorage'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(readToken())
  }, [])

  const handleLogout = () => {
    setToken(null)
    clearStorage()
    client.resetStore()
  }

  const handleLogin = () => {
    setPage('authors')
  }

  const handleNewBook = () => {
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        isAuthenticated={token !== null}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        onNewBook={handleNewBook}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        onLogin={handleLogin}
      />

    </div>
  )
}

export default App