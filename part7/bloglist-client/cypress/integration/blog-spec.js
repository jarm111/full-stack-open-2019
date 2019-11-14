import { addBlog } from '../../src/reducers/blogReducer'

const seedBlog = () => {
  cy
    .window()
    .its('store')
    .invoke('getState')
    .then(function(state) {
      const token = state.login.token
      cy
        .window()
        .its('store')
        .invoke('dispatch', addBlog(this.newBlog, token))
    })
}

describe('Blog', function() {
  beforeEach(function() {
    cy.resetDb()
    cy.seedUser()
    cy.login()
  })

  it('user can create a new blog', function() {
    const { title, author, url } = this.newBlog

    cy.contains('new blog').click()
    cy.get('input[name=title]').type(title)
    cy.get('input[name=author]').type(author)
    cy.get('input[name=url]').type(url)
    cy.get('button:contains("create")').click()
    cy.get('[data-cy=blog-link]').should('contain', title)
  })

  it('user can remove own blog', function() {
    seedBlog()
    cy.get('[data-cy=blog-link]').click()
    cy.contains('remove').click()
    cy.get('[data-cy=blog-link]').should('not.contain', this.newBlog.title)
  })

  it('user can like blog', function() {
    seedBlog()
    cy.get('[data-cy=blog-link]').click()
    cy.contains('0 likes')
    cy.get('button:contains("like")').click()
    cy.contains('1 likes')
  })
})