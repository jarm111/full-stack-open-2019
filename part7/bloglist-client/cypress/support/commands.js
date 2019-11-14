import { login } from '../../src/reducers/loginReducer'

const backendUrl = Cypress.env('BACKEND_URL')

beforeEach(function() {
  cy.fixture('user').as('user')
  cy.fixture('newPost').as('newPost')
})

Cypress.Commands.add('resetDb', function() {
  cy.request('POST', `${backendUrl}/testing/reset`)
})

Cypress.Commands.add('seedUser', function() {
  cy.request('POST', `${backendUrl}/users/`, this.user)
})

Cypress.Commands.add('login', function() {
  cy.fixture('user').as('user')
  cy.visit('/')
  cy.window().its('store').invoke('getState')
  cy
    .window()
    .its('store')
    .invoke('dispatch', login(this.user.username, this.user.password))
})