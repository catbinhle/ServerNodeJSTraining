const express = require('express');
const router = express.Router();
const clientService = require('./client.services');

router.post('/register', createClient);
router.post('/login', authentication);
router.post('/uploadAvatar/:id', clientService.uploadAvatar(), uploadAvatar);

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

function uploadAvatar(req, res, next) {
    try {
        clientService.updateClientID(req.params.id, {avatar: req?.file?.path})
        .then(() => res.json({ message: 'Success', statusCode: 1 }))
        .catch(err => next(err))
    } catch (error)  {
        res.status(400).send({ error: error.message })
    }
}

module.exports = router;