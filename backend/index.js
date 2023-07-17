const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config()
const port = process.env.PORT || 4000;
const authRouter = require("./routes/authRouter")
const bodyParser = require("body-parser");
const { errorHandler, notFound } = require("./middelwares/errorHandler");
dbConnect();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use("/api/user", authRouter)
app.use(errorHandler);
app.use(notFound);
app.listen(port , ()=>{
    console.log(`Server is listening at port ${port}`);
})