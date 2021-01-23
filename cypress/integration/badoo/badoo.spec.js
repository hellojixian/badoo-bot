import { getCities } from '../../libs/getCities'

const TIMEZONE_DATA = require('../../fixtures/timezones.json')
const LIKE_COUNT = 10

context('Badoo Bot', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session', 'device_id', 'HDR-X-User-id', 'cookie_settings')
  })

  it('Ensure login', cy.login)

  Cypress._.times(2, (l) => {
    getCities(TIMEZONE_DATA).forEach(city => {
      it(`switch city to ${city}`, () => {
        cy.setCity(city)
      })

      it(`should open the encounter page`, () => {
        cy.visit('/encounters')
      })

      let no_more_match = false
      for (let i=0; i<LIKE_COUNT; i++) {
        it(`should send a like times ${i}/${LIKE_COUNT}`, () => {
          if (no_more_match) return
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
              // handle no more matches
              if(body.find('.js-import-contacts-items').length) {
                no_more_match = true
                return
              }
            })
        })
      }
    }) //close getCities
  })
}) //close context