const request = require('request');

const forecast = (latitude, longitude, cb) => {
    const url = `https://api.darksky.net/forecast/cb0c401500f2621c9cd3453ceff364e3/${latitude},${longitude}`
    request({url, json:true }, (error, response) => {
        const { temperature, precipProbability} = response.body.currently
        const { summary,temperatureLow, temperatureHigh } = response.body.daily.data[0]
        if (error) {
            cb('no internet', undefined)
        } else if ( response.body.error ) {
            cb('no address found', undefined)
        } else {
            cb( undefined, 
                `${summary} It is currently ${temperature} degrees.\n There is a ${precipProbability}% chance of rain. \n Daily high ${temperatureHigh}.\n Daily Low ${temperatureLow}.`
            )
        }
    })
}


module.exports = forecast;