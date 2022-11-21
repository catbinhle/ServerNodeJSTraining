const express = require('express')
const app = express()
const {jwToken} = require('./_helpers/jwt')

app.use(express.json());
app.use(jwToken())

app.use('/home', require('./home/home.controller'))
app.use('/client', require('./client/client.controller'))
app.use('/avatars', express.static('./avatars'));

app.listen(3000, function () {
  console.log('Server listening on port ' + 3000);
})