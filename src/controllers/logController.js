const { factory } = require('../factory/quey_factory');

async function login (req, res) {

    let { user, password } = req.body

    console.log(user)
    console.log(password)
    let sql = `SELECT * FROM super_usuario WHERE nombres LIKE "%${user}" && codigo Like "%${password}"`;
    const response = await factory(sql)

    res.json(response)
}

module.exports = {
    login
}