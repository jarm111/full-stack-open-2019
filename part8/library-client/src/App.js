import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/react-hooks'
import { readToken, clearStorage } from './utils/localStorage'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './graphql/subscriptions'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: { data: { bookAdded } } }) => {
      window.alert(`New book ${bookAdded.title} added!`)
    }
  })

  useEffect(() => {
    setToken(readToken())
  }, [])

  const handleLogout = () => {
    setToken(null)
    clearStorage()
    client.resetStore()
    setPage('authors')
  }

  const handleLogin = () => {
    setPage('authors')
  }

  const handleNewBook = () => {
    setPage('books')
  }

  const isPage = what => what === page

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      {isPage('authors') && <Authors
        isAuthenticated={token !== null}
      />}

      {isPage('books') && <Books/>}

      {isPage('add') && <NewBook
        onNewBook={handleNewBook}
      />}

      {isPage('login') && <Login
        setToken={setToken}
        onLogin={handleLogin}
      />}

      {isPage('recommend') && <Recommend/>}
    </div>
  )
}

export default App