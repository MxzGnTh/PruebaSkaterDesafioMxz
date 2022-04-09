const express = require('express')
//const expressFileupload = require('express-fileupload')
const { getUser, postUsers, getLogin, getAdminUSER, deleteUser, updateUser } = require('../controllers/user.controlle')
const { requireAuth } = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/', getUser)
router.post('/login', getLogin)
router.post('/registroUser',postUsers)
router.get('/adminRoute',requireAuth,getAdminUSER )
router.delete('/eliminar',deleteUser)
router.put('/editarPerfil',updateUser)



/*router.use(
    expresFileupload({
        abortOnLimit: true,
        limits:{fileSize: 5 * 1024 * 1024},
    })
)*/

module.exports = router
