describe('Login', function() {
  beforeEach(function() {
    cy.resetDb()
    cy.seedUser()
  })

  it('user can login', function() {
    cy.visit('/')
    cy.get('input[name=username]').type(this.user.username)
    cy.get('input[name=password]').type(this.user.password)
    cy.contains('login').click()
    cy.contains('John Doe logged in')
  })

  it('user can logout', function() {
    cy.login()
    cy.contains('John Doe logged in')
    cy.contains('logout').click()
    cy.contains('login')
  })
})