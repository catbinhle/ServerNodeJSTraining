const db = require('../_helpers/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json')
const Client = db.Client

async function createClient(param) {
    //Check exist account
    if (await Client.findOne({ username: param.username })) {
        throw 'Username "' + param.username + '" is already taken';
    }

    const client = new Client(param);

    // hash password
    if (param.password) {
        client.hash = bcrypt.hashSync(param.password, 10);
    }

    await client.save();
}

async function authentication(param) {
    
    const client = await Client.findOne({username: param.username }).exec()
    
    if (client && bcrypt.compareSync(param?.password, client?.hash)) {
        const token = jwt.sign({ sub: client.id }, config.secret, { expiresIn: '7d' });
        
        return {
            ...client.toJSON(),
            token
        };
    }
}

module.exports = {
    createClient,
    authentication
};