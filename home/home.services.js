const db = require('../_helpers/db');
const multer = require('multer')
const fs = require('fs')
const Home = db.Home

async function postHome(param) {
    const home = new Home(param)
    await home.save()
}

async function getHome() {
    return await Home.find()
}

async function getHomeID(id) {
    return await Home.findById(id)
}

async function updateHomeID(id, param) {
    let home = await Home.findById(id)
    
    if (!home) throw `${id} not found`
    Object.assign(home, param) 

    await home.save()
}

async function deleteHomeID(id) {
    let home = await Home.findById(id)

    if (!home) throw `${id} not found`
    home.images?.forEach((file) => {
        fs.unlinkSync(file.path)
    })

    await Home.findByIdAndRemove(id)
}

function uploadMedias() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, './mediaFiles')
      },
      filename: function (req, file, cb) {
         cb(null, file.originalname);
      }
    });
  
    return multer({ storage: storage }).array('images', 9)
}

module.exports = {
    postHome,
    getHome,
    getHomeID,
    updateHomeID,
    deleteHomeID,
    uploadMedias
};