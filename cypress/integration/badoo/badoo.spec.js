import { getCities } from '../../libs/getCities'
import $ from 'jquery'

const TIMEZONE_DATA = require('../../fixtures/timezones.json')
const LIKE_COUNT = 200
const ROUNDS = 1

context('Badoo Bot', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session', 'device_id', 'HDR-X-User-id', 'cookie_settings')
  })

  it('Ensure login', cy.login)

  // const cities = getCities(TIMEZONE_DATA)
  const cities = ['Kherson','Kyiv','Odessa', 'Moscow','peterburg']
  Cypress._.times(ROUNDS, (l) => {
    cities.forEach(city => {
      it(`switch city to ${city}`, () => {
        cy.setCity(city)
      })

      it(`should open the encounter page`, () => {
        cy.visit('/encounters').wait(5000)
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

      // it(`should open the messages center`, () => {
      //   cy.visit('/messenger/open').wait(1000)
      // })

      // it(`should load more chat`, cy.loadMoreChat)

      // it('should answer new messages', () => {
      //   const contacts = []
      //   cy.get('.js-im-users').children('.contacts__item').each(el => {
      //     contacts.push($(el).attr('id'))
      //   }).then(() => {
      //     cy.log('Contacts', contacts.length)
      //     contacts.forEach(id => {
      //       cy.get(`#${id}`)
      //         .wait(1000)
      //         .click()
      //         .wait(2000)
      //         .get(`.messenger__main #messages`).then((messager) => {
      //           if ($(messager).find('#js-messages-list').length) {
      //             if ($(messager).find('#js-messages-list .messages .message').last().hasClass('message--in')){
      //               // my turn
      //               cy.log('now its my turn', id)
      //             } else {
      //               // her turn
      //               cy.log('wait for her turn', id)
      //             }
      //           } else {
      //             // init greating
      //             cy.log('send greeting to', id)
      //           }
      //         })

      //     })
      //   })
      // })

    }) //close getCities
  })
}) //close context