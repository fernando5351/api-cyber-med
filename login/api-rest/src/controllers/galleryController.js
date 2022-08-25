const factory = require("../factory/query_factory")

async function getGallery (){
    const query = `SELECT * FROM gallery`;
    const get = await factory(query)

    res.json(get)
}

async function postGallery () {
    const sql = `INSERT INTO gallery()`
}

module.exports = {
    getGallery
}