const LIKE_COUNT = 1

context('Badoo Auth', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session', 'device_id', 'HDR-X-User-id', 'cookie_settings')
  })

  it('Ensure login', () => {
    cy.visit('/signin')
      .viewport(1200,800)
    cy.location().then((location) => {
      if (location.pathname === '/signin') {
        cy.get('input[name=email]').clear({force: true}).type(Cypress.env('BADOO_ACCOUNT'))
        .get('input[name=password]').clear({force: true}).type(Cypress.env('BADOO_PASSWD'))
        .get('button[type=submit]').click()
        .then(() => {
          cy.url().should('contain', '/encounters/')
          cy.get('.sidebar-info__signout').should('exist')
        })
      }
    })
  })

  it('set location', () => {
    cy.viewport(1200,800)
      .get('a.sidebar-info__userpic').click()
      .get('.js-profile-location-container div.js-profile-edit-block-toggle').click()
      .get('.js-profile-location-container .text-field input').type('Odesa').click().wait(1000)
      .get('.js-profile-location-container li.option:first').click()
      .get('.js-profile-location-container .js-profile-location-edit-save').click()
  })

  it(`should send a like ${LIKE_COUNT} times`, () => {

    cy.visit('/encounters')
    for (let i=0; i<LIKE_COUNT; i++) {
      cy.get('html')
        .trigger('keyup', {keyCode:32, key:' '})
        .wait(1000)
        .trigger('keyup', {keyCode:32, key:' '})
        .wait(1000)
        .trigger('keyup', {keyCode:49, key:'1'})
        .wait(1000)
        .get('html').then(body => {
          if(body.find('.js-chrome-pushes-allow').length) {
            return cy.get('.js-chrome-pushes-allow').click()
          }
        })
    }
  })
})