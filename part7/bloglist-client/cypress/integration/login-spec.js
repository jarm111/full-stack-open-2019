import { login } from '../../src/reducers/loginReducer'

const user = {
  name: 'John Doe', 
  username: 'john-doe', 
  password: 'password'
}

const { username, password } = user
const backendUrl = 'http://localhost:3003/api'

describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', `${backendUrl}/testing/reset`)
    cy.request('POST', `${backendUrl}/users/`, user)
    cy.visit('/')
  })

  it('user can login', function() {   
    cy.get('input[name=username]').type(user.username)
    cy.get('input[name=password]').type(user.password)
    cy.contains('login').click()
    cy.contains('John Doe logged in')
  })

  it('user can logout', function() {
    cy.window().its('store').invoke('getState')
    cy
      .window()
      .its('store')
      .invoke('dispatch', login(username, password))
    cy.contains('John Doe logged in')
    cy.contains('logout').click()
    cy.contains('login')
  })
})