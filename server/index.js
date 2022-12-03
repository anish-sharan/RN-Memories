const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes/api');
const auth = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const mongoURL = process.env.DB;

const Schema = mongoose.Schema;

mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err))

app.get('/', auth, (req, res) => {
    res.status(200).json({success: true, message: `your email ${req.user.email}`});
})
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Server is running', PORT);
})
