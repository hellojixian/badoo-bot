export const getCities = (timezones) => {
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
}