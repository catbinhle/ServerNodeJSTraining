const db = require('../_helpers/db');
const Home = db.Home

async function postHome(param) {
    const home = new Home(param)
    await home.save()
}

async function getHome(param) {
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
    await Home.findByIdAndRemove(id)
}

module.exports = {
    postHome,
    getHome,
    getHomeID,
    updateHomeID,
    deleteHomeID
};