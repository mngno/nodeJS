const mongoose = require('mongoose')
const colors = require('colors')

module.exports = () =>{
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.MONGO_URL,connectionParams)
        console.log('database holbogdloo' .bgMagenta.white)
    } catch (error) {
        console.log(error)
        console.log('database maani holbogdoogui bna' .bgRed.white)
    }
}