require("dotenv").config()
const app = require("./src/app")

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`SERVER RUNING ON PORT ${app.get('port')}`)
    }
})