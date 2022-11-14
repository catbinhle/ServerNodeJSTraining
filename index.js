const express = require('express')
const app = express()

app.use(express.json());
app.use('/home', require('./home/home.controller'))

app.listen(3000, function () {
  console.log('Server listening on port ' + 3000);
})