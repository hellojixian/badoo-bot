Cypress.Commands.add("sendLike", () => {
  cy.get('html')
    .trigger('keyup', {keyCode:32, key:' '})
    .wait(1000)
    .trigger('keyup', {keyCode:32, key:' '})
    .wait(1000)
    .trigger('keyup', {keyCode:49, key:'1'})
    .wait(1000)
    .get('html').then(body => {
      // handle the push notification popup
      if(body.find('.js-chrome-pushes-allow').length) {
        cy.get('.js-chrome-pushes-allow').click()
      }
      // handle another device login popup
      if(body.find('.js-continue').length) {
        cy.get('.js-continue').click()
      }
      // handle matches
      if(body.find('.js-ovl-content .text-field input').length) {
        cy.get('.js-ovl-content .text-field input')
          .type('Hi! So happy to meet you!').wait(1000)
          .get('.js-ovl-content .js-send-message').click()
      }
    })
})