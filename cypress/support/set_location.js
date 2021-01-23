
Cypress.Commands.add("getCities", () => {
  return cy.fixture('timezones').then(timezones => {
    const ts = new Date()
    const tz = ts.getHours() - ts.getUTCHours()
    const idealTz = 20 - tz - 12
    const idealTimezone = `(UTC${idealTz>0?'+':'-'}${idealTz.toString().padStart(2, '0')}:00)`
    const tzlist = timezones.filter(tz => {
      if (tz.WindowsTimeZones[0].Name.substr(0,11) === idealTimezone) return true
      return false
    })
    const cities = []
    tzlist.forEach(tz => {
      tz.TimeZones.forEach(tzName => {
        cities.push(tzName.split('/')[1].replaceAll('_', ' '))
      })
    })
    return cities
  })
})

Cypress.Commands.add("setCity", (city) => {
  cy.viewport(1200,800)
    .get('a.sidebar-info__userpic').click()
    .get('.js-profile-location-container div.js-profile-edit-block-toggle').click()
    .get('.js-profile-location-container .text-field input').type(city).click().wait(1000)
    .get('.js-profile-location-container li.option:first').click()
    .get('.js-profile-location-container .js-profile-location-edit-save').click()
})