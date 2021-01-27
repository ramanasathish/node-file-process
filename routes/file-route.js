const {Router} = require('express');
const fileController = require('../controller/file-controller');
const app = Router();

app.get('/csv',fileController.fetchFromFile);

module.exports = app;