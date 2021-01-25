Cypress.Commands.add("loadMoreChat", () => {
   // load more chat
   cy.get('.messenger__contacts .scroll__inner')
    .scrollTo('bottom').wait(2000)
    .scrollTo('bottom').wait(2000)
    .scrollTo('bottom').wait(2000)
    .scrollTo('top')
})