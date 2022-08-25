const connection = require("../../config/connection/index")
const util = require('util')
const query = util.promisify(connection.query).bind(connection)

async function factory(sql) {
    try {
        let sql_query = sql;
        const res = await query(sql_query)
        return res;
    } catch (error) {
        console.log(error)
    }
}

module.exports = factory;