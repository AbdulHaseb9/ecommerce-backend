const app = require('./app');
const dbconnect = require('./db');
require('dotenv').config()


dbconnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`db not connected ${err}`);
    })
