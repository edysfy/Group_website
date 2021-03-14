const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoDBConnect = "mongodb+srv://Hari:G8F1P3MeLb77pV48@cluster0.9hjpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/*init an express middleware*/
const app = express();


/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json());
/*parses urlencoded bodies*/
app.use(bodyParser.urlencoded({extended: false}))

/*connect to mongoDb*/
mongoose.connect(mongoDBConnect,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => {
    console.log("Rest Api has sucessfully connected to mongoDb Database");
})
.catch(err=>{
    console.log("Failed to connect ot mongoDb");
})




module.exports = app;