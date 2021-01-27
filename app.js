const express = require('express');
const bodyParser  = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
const fileRoutes = require('./routes/file-route');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(fileRoutes);
app.use((_,res)=>{
    res.status(404).send('Route not Found');
})


module.exports = app;