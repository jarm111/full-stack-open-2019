import { login } from '../../src/reducers/loginReducer'

const user = {
  name: 'John Doe', 
  username: 'john-doe', 
  password: 'password'
}

const { username, password } = user

const newPost = {
  title: 'This is a test blog',
  author: 'John D.',
  url: 'http://testing-cypress.com'
}

const backendUrl = 'http://localhost:3003/api'

describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', `${backendUrl}/testing/reset`)
    cy.request('POST', `${backendUrl}/users/`, user)
    cy.visit('/')
    cy.window().its('store').invoke('getState')
    cy
      .window()
      .its('store')
      .invoke('dispatch', login(username, password))
  })

  it('can create a new blog', function() {
    cy.contains('new blog').click()
    cy.get('input[name=title]').type(newPost.title)
    cy.get('input[name=author]').type(newPost.author)
    cy.get('input[name=url]').type(newPost.url)
    cy.get('button:contains("create")').click()
    cy.get('[data-cy=blog-link]').should('contain', newPost.title)
  })
})