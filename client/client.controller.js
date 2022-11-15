const express = require('express');
const router = express.Router();
const clientService = require('./client.services');

router.post('/register', createClient);
router.post('/login', authentication);

function createClient(req, res, next) {
    clientService.createClient(req.body)
    .then(() => res.json({ message: 'Success', statusCode: 1 }))
    .catch(err => {
        next(err)}
    );
}

function authentication(req, res, next) {
    clientService.authentication(req.body)
    .then((client) => client ? res.json(client) : res.sendStatus(404))
    .catch(err => {
        next(err)}
    );
}


module.exports = router;