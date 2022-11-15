const { expressjwt: jwt } = require("express-jwt")
const config = require('../config.json');
const clientService = require('../client/client.services');

function jwToken() {
    return jwt({ secret: config.secret, algorithms: ["HS256"], isRevoked: isRevoked }).unless({ 
        path: [
            '/client/login',
            '/client/register'
        ] 
    })
}

async function isRevoked(req, token) {
    return token?.payload?.iat > token?.payload?.exp
};

module.exports = jwToken;