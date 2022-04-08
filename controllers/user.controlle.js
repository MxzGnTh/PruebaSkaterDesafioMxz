const jwt =require('jsonwebtoken')
const { getUsersDB, postUserDB, getUserLoginDB,getAdminUserDB, deleteUserDB, updateUserDB } = require('../database');
const {nanoid}= require('nanoid');
const bcryptjs = require('bcryptjs');
const path = require('path');



const getUsers=async (req, res) => {
    getUsersDB()
    .then(rows => res.json({ok: true, skaters: rows}))
    .catch (error => res.json({ok: false, msg: error}))
    
}
const postUsers = async (req, res) => {
   //Datos usuario 
    const {email,nombre,anos_experiencia,especialidad}=req.body
    //FOTO
    const {Foto} = req.files 
    
    //proteger foto
    const pathFoto =`${nanoid()}.${foto.mimetype.split('/')[1]}`

    //ENCRIPTAR CONTRASEÑA
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(req.body.password, salt)
    //guardar foto
    foto.mv(path.join(__dirname,"../public/img", pathFoto), async(err)=>{
        if(err) return next(err)       
        res.json({ok: true, msg: "todo listo"})
    })

    const respuesta = await postUserDB({email,nombre,hash,anos_experiencia,especialidad,pathFoto})

    //crear token
    const playload ={id:respuesta.id} 
    const token= jwt.sign(playload,process.env.JWT_SECRET)    
    return ( token)
}
const getLogin=async (req, res) =>{

    const { emaillogin, passwordlogin } = req.body;
    const email = emaillogin;
    const password = passwordlogin;

    try {
        
        // Validacion de datos en body
        if (!email?.trim() || !password?.trim()) {
            console.log('campos vacios')
        }

        // verificacion de email con DB
        const respuesta = await getUserLoginDB(email);
        const { skaters } = respuesta;
        if (!respuesta.ok) {
            throw new Error("email incorrecto");
        }

        if (skaters.email !== email) {
            throw new Error("No existe el email registrado");
        }
        // Verificacion de password con DB
        const comparePassword = await bcryptjs.compare(password, skaters.password);
        if (!comparePassword) {
            console.log('contraseña incorrecta');
            res.json({res:"la contraseña incorrecta"})
        }

        // generar JWT
        const payload = { id: skaters.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log(skaters,token)
        res.json({skaters,token})
        return ({
            ok: true,
            token,
        });
       
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
}
const getAdminUSER = async(req, res) =>{
    const respuesta = await getAdminUserDB()
    

    try {
        (rows => res.json({ok: true, skaters: rows}))
    } catch (error) {
        (error => res.json({ok: false, msg: error})) 
    }

    return res.json({ ok: true, respuesta });
}
const deleteUser= async (req, res) => {
    const{email}=req.body
    console.log(email)
    try {
                // validar campos del body
                if (!email?.trim() ) {
                    console.log('campos vacios')
                }
        
                // Verificacion  DB
                const verificador = await getUserLoginDB(email);
                const { skaters } = verificador;
                if (!verificador.ok) {
                    throw new Error("email incorrecto");
                }
        
                if (skaters.email !== email) {
                    throw new Error("No existe el email registrado");
                }
                
                const respuesta = await deleteUserDB(email)
                console.log('se elimino correctamente')
                res.json({r:"se elimino correctamente",respuesta})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
 
}
const updateUser= async (req, res) => {
    const {nombre,anos_experiencia,especialidad,email}=req.body
  try {
        // validar campos del body
        if (!email?.trim() ) {
            console.log('campos vacios')
        }

        // Validacion de contraseña en DB
        const verificador = await getUserLoginDB(email);
        const { skaters } = verificador;
        if (!verificador.ok) {
            throw new Error("email incorrecto");
        }

        if (skaters.email !== email) {
            throw new Error("No existe el email registrado");
        }

        const respuesta = await updateUserDB(nombre,anos_experiencia,especialidad,email)  
        console.log(respuesta)
        res.json(
            {msg:'se actualizo',
            skater: respuesta
        })
     
  } catch (error) {
    console.log(error);
    return res.status(400).json({
        ok: false,
        msg: error.message,
    });
  }
}

module.exports={
    getUsers,
    getLogin,
    getAdminUSER,
    postUsers,
    deleteUser,
    updateUser
}