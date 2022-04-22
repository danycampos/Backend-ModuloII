const express = require('express');
const app = express.Router();

app.use('/usuario', require('./usuarios/usuario'));
app.use('/producto', require('./producto/producto'));

module.exports = app;