const express = require('express')
const { GetUsers, postUsers } = require('../controllers/user.controlle')
const router = express.Router();

router.get('/',getUsers)

router.post('/',postUsers)


router.get('/', getUsers)
router.post('/login', getLogin)
router.post('/registroUser',postUsers)
router.get('/adminRoute',requireAuth,getAdMIN )
router.delete('/eliminar',deleteUser)
router.put('/datosperfil',updateUser)

module.exports = router
