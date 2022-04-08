const { Router } = require("express")
const {getUsersDB} = require("../database/index")
const router = Router()

router.get("/", async (req, res) => {
    const rows = await getUsersDB()
    res.render("index", {rows})
})

router.get("/login", (req, res) => {
    res.render("inicioSesion")
})

router.get("/registroUser", (req, res) => {
    res.render("registroUser")
})

router.get("/adminRoute", async (req, res) => {
    const rows = await getAdminDB()
    res.render("adminRoute", {rows})
    
})

router.get("/datosperfil", (req, res) => {
    res.render("datosperfil")
})

module.exports = router