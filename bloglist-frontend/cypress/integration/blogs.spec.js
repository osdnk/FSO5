/* eslint-disable no-undef */
describe('Blogs app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // creating test user on backend site
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })
  describe('login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#password').type('sample')
      cy.get('#login').type('michal')
      cy.contains('Login').click()

      cy.contains('hey, logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#password').type('samole')
      cy.get('#login').type('michal')
      cy.contains('Login').click()

      cy.contains('Invalid login and password!')
    })
  })

  describe('After logging in', () => {
    beforeEach(() => {
      cy.get('#password').type('sample')
      cy.get('#login').type('michal')
      cy.contains('Login').click()
      cy.contains('hey, logged in')
    })

    describe('After creating a blog', () => {
      beforeEach(() => {
        cy.contains('add blog').click()
        cy.get('#title').type('New blog')
        cy.get('#url').type('google.pl')
        cy.contains('Add').click()
      })

      it('A blog is visible ', () => {
        cy.contains('New blog')
      })

      it('allows user to like a blog', async () => {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('1')
      })


      it('allows user to delete blogs created by him or her', () => {
        cy.contains('New blog')
          .parent()
          .contains('View')
          .click()
          .then(() => {
            cy.contains('Delete').click()
          })
        cy.contains('New blog').should('not.exist')
      })

    })


    it('displays blogs sorted by the number of likes', () => {
      cy.contains('add blog').click()
      cy.get('#title').type('New blog')
      cy.get('#url').type('google.pl')
      cy.get('#author').type('michal')
      cy.get('.add').click()
      cy.contains('add blog').click()
      cy.get('#title').type('New blog2')
      cy.get('#url').type('google.com')
      cy.get('#author').type('michal2')
      cy.get('.add').click()
      cy.contains('add blog').click()
      cy.get('#title').type('New blog3')
      cy.get('#url').type('google.fi')
      cy.get('#author').type('michal3')
      cy.get('.add').click()
      cy.contains('New blog')
        .parent()
        .contains('View')
        .click()
        .then(() => {
          cy.get('.like').click()
          cy.get('.like').click()
          cy.get('.like').click()
          cy.get('.like').click()
          cy.get('.like').click()
          cy.contains('Hide').click()
        })

      cy.contains('New blog3')
        .parent()
        .contains('View')
        .click()
        .then(() => {
          cy.get('.like').click()
          cy.get('.like').click()
          cy.get('.like').click()
          cy.get('.like').click()
          cy.contains('Hide').click()
        })

      let lastVal = Infinity
      cy.get('.blog-wrapper').each((blog) => {
        cy.wrap(blog)
          .contains('View')
          .click()
          .then(() => {
            cy.wrap(blog)
              .contains(/Likes: \d+/)
              .then((likes) => {
                const value = Number(likes.text().slice(7))
                expect(value).to.be.lessThan(lastVal+1) // less or equal
                lastVal = value
              })
          })
      })
    })
  })
})
