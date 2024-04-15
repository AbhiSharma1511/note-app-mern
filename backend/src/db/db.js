const mongoose = require("mongoose");
const { DB_NAME } = require("../../constant.js");

const db_connection = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Mongoose connection error: ${error.message}`);
        process.exit(1);
    }
}

module.exports =  db_connection;