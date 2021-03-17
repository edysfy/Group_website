const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const path = require('path');

const mongoDBConnect = "mongodb+srv://Hari:G8F1P3MeLb77pV48@cluster0.9hjpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/*init an express middleware*/
const app = express();

/*use cors to allow cross origin resource*/
app.use(cors());

/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json());
/*parses urlencoded bodies*/
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '../../dist/demosite')));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/demosite/index.html'));
});

/*connect to mongoDb*/
mongoose.connect(mongoDBConnect,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => {
    console.log("Rest Api has successfully connected to mongoDb Database");
})
.catch(err=>{
    console.log("Failed to connect ot mongoDb");
})



app.use("/user",userRoutes);



module.exports = app;
