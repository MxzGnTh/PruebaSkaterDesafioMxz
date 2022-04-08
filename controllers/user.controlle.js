const jwt =require('jsonwebtoken')
const { getSkatersDB, postUserDB, deleteUserDB } = require('../database');
const {nanoid}= require('nanoid');
const bcryptjs = require('bcryptjs');
const path = require('path');


const getSkatersDB = async (req, res) => {
    getSkatersDB()
    .then(rows => res.json({ok: true, skaters: rows}))
    .catch (error => res.json({ok: false, msg: error}))
}

const postUserDB = async (req, res) => {

    const {foto} = req.files 

    const pathFoto =`${nanoid()}.${foto.mimetype.split('/')[1]}`

    //Hashear Contraseña
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(req.body.password, salt)
    
    //foto guardada
    foto.mv(path.join(__dirname,"../public/img", pathFoto), async(err)=>{
        if(err) return next(err)       
        res.json({ok: true, msg: "todo listo"})
    })
    
    req.body.foto = pathFoto
    req.password = hash

    const respuesta = await postUserDB(req.body)
        
    //Creacion de toketen

    /*const playload ={id:respuesta.id} 
    const token= jwt.sign(playload,process.env.JWT_SECRET)    
    console.log("~ file: user.controlle.js ~ line 38 ~ postUsers ~ token", token)

    return ( token)*/
}