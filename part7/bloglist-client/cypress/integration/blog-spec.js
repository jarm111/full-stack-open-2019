describe('Blog', function() {
  beforeEach(function() {
    cy.resetDb()
    cy.seedUser()
    cy.login()
  })

  it('can create a new blog', function() {
    const { title, author, url } = this.newPost

    cy.contains('new blog').click()
    cy.get('input[name=title]').type(title)
    cy.get('input[name=author]').type(author)
    cy.get('input[name=url]').type(url)
    cy.get('button:contains("create")').click()
    cy.get('[data-cy=blog-link]').should('contain', title)
  })
})