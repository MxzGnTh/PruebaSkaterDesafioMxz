exports.load = (app) => {
    app.use(require("./front.route"))
    app.use("/api/v1", require("./api.route"))
}