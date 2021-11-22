const express = require('express');
const bodyParser = require("body-parser")
const router = express.Router();
const app = express();
const mongoose = require('mongoose')

// Database config
const connection = require('./config/db.config.js')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
}))
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))
app.use('/api/url', require('./routes/stats'))

app.use("/", router);

app.listen(5000, () => {console.log("Server started on port 5000")})