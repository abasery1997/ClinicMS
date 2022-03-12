require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

//routes
const router = require('./routes/router');

// listing to server
const app=  express();

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening to port 8080 `)
});




// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//main Page Routes
app.use('/', router);

//unknown paths
app.use((req, res, next) => {
  res.status(404).json({message :" unknown url paths"});

});
//error
app.use((error, req, res, next) => {
  res.status(500).json({error});

})

