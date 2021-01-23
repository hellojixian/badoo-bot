Cypress.Commands.add("login", () => {
  cy.visit('/signin')
    .viewport(1200,800)
  return cy.location().then((location) => {
    if (location.pathname === '/signin') {
      return cy.get('input[name=email]').clear({force: true}).type(Cypress.env('BADOO_ACCOUNT'))
      .get('input[name=password]').clear({force: true}).type(Cypress.env('BADOO_PASSWD'))
      .get('button[type=submit]').click()
      .then(() => {
        cy.wait(2000)
      })
    }
  })
})