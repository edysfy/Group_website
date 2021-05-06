const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const geopostRoutes = require('./routes/geopost');
const searchRoutes = require('./routes/search');

const path = require('path');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;



const mongoDBConnect = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@emotemap.esifj.mongodb.net/postDB?retryWrites=true&w=majority`;

/*init an express middleware*/
const app = express();

/*use cors to allow cross origin resource*/
app.use(cors());

/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(path.join(__dirname, '../../dist/demosite')));
// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});



/*connect to mongoDb*/
mongoose.connect(mongoDBConnect,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => {
    console.log("Rest Api has successfully connected to mongoDb Database");
})
.catch(err=>{
    console.log("Failed to connect to mongoDb");
})



app.use("/api/user",userRoutes);
app.use("/api/geopost",geopostRoutes);
app.use("/api/search",searchRoutes);

module.exports = app;
