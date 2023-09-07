const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDb database ${mongoose.connection.host}`.bgCyan.white)
    }catch(err) {
        console.log(`MongoDb Database Error: ${err}`.bgRed.white)
    }
}

module.exports = connectDB