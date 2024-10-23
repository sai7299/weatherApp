const mongoose = require("mongoose");


const weatherData = {
    weather: {
        type: String,
        required: true
    },
    min_temp: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    max_temp: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    temp: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
}


const weatherSchema = new mongoose.Schema( { 
hyderabad: [weatherData],
bengaluru: [weatherData],
delhi: [weatherData],
kolkata: [weatherData],
mumbai: [weatherData],
chennai: [weatherData],
createdAt: { type: Date, default: Date.now }
},{
    versionKey: false
})

module.exports = mongoose.model('Weather',weatherSchema );