const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')

exports.load = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}));
    app.use(fileUpload())

    app.use(express.static(path.join(__dirname, '../public')))
    app.use(express.static(path.join(__dirname, "../node_modules/bootstrap/dist")))
}