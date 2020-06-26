
describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti hellas',
      username: 'hellas',
      password: 'Haslo'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

  })

  describe('Blogs ', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('hellas')
      cy.get('#password')
        .type('Haslo')
      cy.contains('login')
        .click()
      cy.contains('Blogs')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('author_test')
      cy.get('#url')
        .type('www.url_test.com')
      cy.get('#createButton')
        .click()
      cy.contains('a blog created by cypress')
    })

    it('remove a new blog', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('author_test')
      cy.get('#url')
        .type('www.url_test.com')
      cy.get('#createButton')
        .click()
      cy.wait(6000)
      cy.contains('a blog created by cypress')
        .click()
      cy.contains('remove')
        .click()
    })
  })

})
