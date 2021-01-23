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
          cy.sendLike()
            .get('html')
            .then(body => {
            // handle no more matches
            if(body.find('.js-import-contacts-items').length) {
              no_more_match = true
            }
          })
        })
      }
    }) //close getCities
  })
}) //close context