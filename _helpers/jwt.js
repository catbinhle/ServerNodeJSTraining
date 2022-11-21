const { expressjwt: jwt } = require("express-jwt")
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');

function jwToken() {
    return jwt({ secret: config.secret, algorithms: ["HS256"], isRevoked: isRevoked }).unless({ 
        path: [
            '/client/login',
            '/client/register'
        ] 
    })
}

async function isRevoked(req, token) {
    let now = new Date().getTime() / 1000
    return now.toFixed() > token?.payload?.exp
};

function createHash(password) {
    return bcrypt.hashSync(password, 10);
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash)
}

function createToken(id) {
    return jsonwebtoken.sign({ sub: id }, config.secret, { expiresIn: '7d' });
}

module.exports = {
    jwToken,
    createHash,
    compareHash,
    createToken
};