const express = require('express');
const router = express.Router();
const homeService = require('./home.services');

router.post('/postHome', homeService.uploadMedias(), postHome);
router.get('/getListHome', getHome);
router.get('/:id', getHomeID);
router.put('/updateHome/:id', updateHomeID);
router.delete('/deleteHome/:id', deleteHomeID);

function postHome(req, res, next) {
    try {
        let newHome = {
            title: req.body.title,
            describe: req.body.describe,
            images: req.files
        } 
        homeService.postHome(newHome)
        .then(() => res.json({ message: 'Success', statusCode: 1 }))
        .catch(err => {
            next(err)}
        );

    } catch (error)  {
        res.status(400).send({ error: error.message })
    }
}

function getHome(req, res, next) {
    homeService.getHome()
    .then((homes) => homes ? res.json(homes) : res.sendStatus(404))
    .catch(err => {
        next(err)}
    );
}

function getHomeID(req, res, next) {
    homeService.getHomeID(req.params.id)
    .then((home) => home ? res.json(home) : res.sendStatus(404))
    .catch(err => {
        next(err)}
    );
}

function updateHomeID(req, res, next) {
    homeService.updateHomeID(req.params.id, req.body)
    .then(() => res.json({ message: 'Success', statusCode: 1 }))
    .catch(err => {
        next(err)}
    );
}

function deleteHomeID(req, res, next) {
    homeService.deleteHomeID(req.params.id)
    .then(() => res.json({ message: 'Success', statusCode: 1 }))
    .catch(err => {
        next(err)}
    );
}

module.exports = router;