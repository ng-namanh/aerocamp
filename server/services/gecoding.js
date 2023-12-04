const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding.js')

// Mapbox Access Token
const mapboxToken = process.env.MAPBOX_TOKEN

// Define Mapbox Geocoding Service
const geocodingService = mbxGeocoder(
  mbxClient({
    accessToken: mapboxToken
  })
)

// const geoData = geocodingService
//   .forwardGeocode({
//     query: location,
//     limit: 1
//   })
//   .send()

module.exports = {
  geocodingService
}
