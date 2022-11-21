const db = require('../_helpers/db');
const {createHash, compareHash, createToken} = require('../_helpers/jwt')
const multer = require('multer')
const fs = require('fs')
const Client = db.Client

async function createClient(param) {
    //Check exist account
    if (await Client.findOne({ username: param.username })) {
        throw 'Username "' + param.username + '" is already taken';
    }

    const client = new Client(param);

    // hash password
    if (param.password) {
        client.hash = createHash(param.password)
    }

    await client.save();
}

async function authentication(param) {
    
    const client = await Client.findOne({username: param.username }).exec()
    
    if (client && compareHash(param.password, client.hash)) {
        const token = createToken(client.id)
        
        return {
            ...client.toJSON(),
            token
        };
    }
}

async function updateClientID(id, param) {
    let client = await Client.findById(id)

    if (!client) throw `${id} not found`
    if (param?.avatar && client?.avatar && param?.avatar !== client?.avatar) {
        fs.unlinkSync(client?.avatar)
    }

    Object.assign(client, param) 

    await client.save()
}

function uploadAvatar() {

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, './avatars')
      },
      filename: function (req, file, cb) {
         cb(null, file.originalname);
      }
    });
  
    return multer({ storage: storage }).single('avatar')
}

module.exports = {
    createClient,
    authentication,
    updateClientID,
    uploadAvatar
};