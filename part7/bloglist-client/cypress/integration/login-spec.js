import { login } from '../../src/reducers/loginReducer'

const user = {
  username: 'john-doe', password: 'password'
}

describe('Login', () => {
  it('user can login', () => {   
    cy.visit('/')
    cy.get('input[name=username]').type(user.username)
    cy.get('input[name=password]').type(user.password)
    cy.contains('login').click()
    cy.contains('John Doe logged in')
  })

  it('user can logout', () => {
    const { username, password } = user
    cy.visit('/')
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