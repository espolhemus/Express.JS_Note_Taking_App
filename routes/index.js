const express = require('express');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
// const diagnostics = require('./routes/diagnostics')
const apiRoutes = require('apiRoutes');
const htmlRoutes = require('htmlRoutes');
const diagnostics = require('diagnostics')

const app = express();
const PORT = process.env.PORT || 3001;

// app.use('/tips', tipsRouter);
// app.use('/feedback', feedbackRouter);
// TODO: Initialize diagnostics route

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use('/diagnostics', diagnostics)

module.exports = app;
