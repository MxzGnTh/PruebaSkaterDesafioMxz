const { Router } = require("express")
const { getUsersDB, getAdminUserDB } = require("../database/index")
const router = Router()

router.get("/", async (req, res) => {
    const rows = await getUsersDB()
    res.render("index", {rows})
})

router.get("/login", (req, res) => {
    res.render("Login")
})

router.get("/registroUser", (req, res) => {
    res.render("Registro")
})

router.get("/adminRoute", async (req, res) => {
    const rows = await getAdminUserDB()
    res.render("Admin", {rows})
    
})

router.get("/editarPerfil", (req, res) => {
    res.render("Datos")
})

router.get("/eliminar",(req, res)=>{
    res.render('eliminar')
})



module.exports = router