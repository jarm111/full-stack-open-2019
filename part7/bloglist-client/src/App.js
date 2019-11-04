import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import NavMenu from './components/NavMenu'
import GlobalStyle from './components/GlobalStyle'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { loginPersistent } from './reducers/loginReducer'

const Container = styled.div`
  margin: 0 auto;
  width: 80%; 
`

const App = ({ login, initBlogs, initUsers, loginPersistent }) => {
  const blogFormToggleRef = useRef()

  useEffect(() => { 
    initBlogs()
    initUsers()
  }, [initBlogs, initUsers])

  useEffect(() => {
    loginPersistent()
  }, [loginPersistent])

  const handleAddBlogSuccess = () => {
    blogFormToggleRef.current.toggleVisibility()
  }

  const showLoginForm = () => (
    <Container>
      <h2>log in to application</h2>
      <LoginForm />
    </Container>
  )

  const showBlogs = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
        <h2>create new</h2>
        <BlogForm onAddBlogSuccess={handleAddBlogSuccess}/>
      </Togglable>
      <Blogs />
    </div>
  )

  const showUsers = () => (
    <div>
      <h2>users</h2>
      <Users />
    </div>
  )

  const showContent = () => (
    <React.Fragment>
      <NavMenu />
      <Container>
        <h1>blogs</h1>
        <Switch>
          <Route exact path="/">
            {showBlogs()}
          </Route>
          <Route exact path="/users">
            {showUsers()}
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  )

  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        <Notification />
        {login ? showContent() : showLoginForm()}
      </Router>
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => {
  return { blogs, login }
}

export default connect(
  mapStateToProps, 
  { initBlogs, initUsers, loginPersistent }
)(App)