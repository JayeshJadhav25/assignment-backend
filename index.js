const express = require('express')
const connection = require('./database/db')
const path = require('path');

const userRoute = require('./routes/userRoute')
const uploadRoute = require('./routes/uploadRoute')

const app = express()
const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json())
app.use('/upload',express.static(path.join("upload")));

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use('/user',userRoute)
app.use('/upload',uploadRoute)

app.listen(port,() => {
    console.log(`server is running on ${port}...`)
})