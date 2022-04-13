const express = require("express");
const path = require("path");
const expressFileUpload = require("express-fileupload");

exports.load = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(expressfileUpload());
	app.use(express.static(path.join(__dirname, "../public")));
	app.use(
		express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
	);
    app.use(
        expressFileUpload({
            limits: { fileSize: 50 * 1024 * 1024 }, //5mb
            abortOnLimit: true,
            responseOnLimit: "el peso máximo es de 5MB",
        })
    );
    app.use(express.static(__dirname + "/public"));
    app.post("/", (req, res) => {
        const { foto } = req.files;
        console.log(foto);
        if (req.files.foto.size >= 50 * 1024 * 1024) {
            return res.send("solo hasta 5MB");
        }
        const mimeTypes = ["image/jpeg", "image/png"];
        if (!mimeTypes.includes(foto.mimetype)) {
            return res.send("solo png o jpg");
        }
    });
};


