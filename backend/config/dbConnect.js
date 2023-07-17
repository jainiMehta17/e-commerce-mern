const mongoose = require("mongoose");
const dbConnect = () =>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected!");
    } catch (error) {
        console.log(`Error connecting database - ${error}`);
    }
}
module.exports = dbConnect;