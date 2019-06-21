const request = require('request')
const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hlZjI3NjE1IiwiYSI6ImNqd3hoMml3ZTBjMno0YXA4dDhkcjk5MGIifQ.sq2khbiIuVx3e6MeFs5_ZA&limit=1`
    request({url, json: true }, (error, {body}) => {
        
        if (error) {
            cb('unable to connect', undefined)
        } else if (body.features.length === 0 ) {
            cb('unable to find location', undefined)
        } else {
            cb(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;