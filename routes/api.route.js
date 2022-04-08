const express = require('express')
const { getUsers, postUsers, getLogin, getAdminUSER, deleteUser, updateUser } = require('../controllers/user.controlle')
const { requireAuth } = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/', getUsers)
router.post('/login', getLogin)
router.post('/registroDatos',postUsers)
router.get('/adminRoute',requireAuth,getAdminUSER )
router.delete('/eliminar',deleteUser)
router.put('/datosperfil',updateUser)

module.exports = router
