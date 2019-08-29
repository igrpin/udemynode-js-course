const request = require('request')

// const forecast = (lat, long, callback) => {
//     const url = 'https://api.darksky.net/forecast/c3141137257a63e4af02e0a685691f83/'+lat+','+long+'?units=si&lang=pt'
//     request({url, json: true}, (error, response) => {
//         if (error){
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Try again.', undefined)
//         } else {
//             callback(undefined, {
//                 temp: response.body.currently.temperature,
//                 summary: response.body.currently.summary,
//                 precipProbability: response.body.currently.precipProbability
//             })
//         }
//     })
// }

// Using Objects Shorthand syntax and Destructuring pattern

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c3141137257a63e4af02e0a685691f83/'+lat+','+long+'?units=si&lang=pt'
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try again.', undefined)
        } else {
            callback(undefined, {
                temp: body.currently.temperature,
                summary: body.currently.summary,
                precipProbability: body.currently.precipProbability,
                body: body
            })
        }
    })
}

module.exports = forecast