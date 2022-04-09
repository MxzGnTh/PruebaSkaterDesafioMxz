const{Pool}=require('pg')
const fs = require('fs')
const path = require('path')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/skatePark'

const pool = process.env.DATABASE_URL ?
 new Pool({
    connectionString:connectionString,
    ssl:{rejectUnauthorized:false}
}): new Pool({connectionString})

//Index usuarios
const getUsersDB = () =>{
    return pool.query("SELECT * FROM skaters").then(res => res.rows);
}
//registro de usuario
const postUserDB = async ({email,nombre,password,anos_experiencia,especialidad,foto}) =>{
    const client = await pool.connect();
    const values = [email,nombre,password,anos_experiencia,especialidad,foto]
    const query = {
        text: "INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        values,
    };

    try {
        const respuesta = await client.query(query);
        const { id } = respuesta.rows[0];
        console.log(id)
        return {
            ok: true,
            id,
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        }
        return {
            ok: false,
            msg: error.message,
        };
    }finally {
        client.release();
    }
}
// Login y validacion 
const getUserLoginDB=async (email)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM skaters  WHERE email =$1 ",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);

            return {
            ok: true,
            skaters :  respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: error.message,
            }         
        }

    }finally {
        client.release();
    }
}
// Modo administrativo
const getAdminUserDB =async ()=>{
    return pool.query("SELECT foto, nombre, anos_experiencia, especialidad FROM skaters").then(res => res.rows);
}
//eliminar usuario
const deleteUserDB = async(email)=>{
    const client = await pool.connect();

    const query =  ( {
        text:"DELETE FROM skaters WHERE email = $1 RETURNING*",
        values:[email]
    })
    try {

        const respuesta = await client.query(query);

        return {
            ok: true,
            msg:respuesta,
        };
    } catch (error) {
        console.log(error);
    return {
            ok: false,
            msg: error.message,
        };
    }finally {
        client.release();
    }
}
// actualizar usuario
const updateUserDB = async (nombre,anos_experiencia,especialidad,email) =>{
    const client = await pool.connect();
    const values=[nombre,anos_experiencia,especialidad,email]
    const query =  ( {
        text: "UPDATE skaters SET nombre = $1, anos_experiencia = $2, especialidad = $3 WHERE email = $4 RETURNING *",
        values
    })
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            msg:respuesta,
        };
    } catch (error) {
        console.log(error);
    return {
            ok: false,
            msg: error.message,
        };
    }finally{
        client.release();
    }
}

const migrar = () => {
    const data = fs.readFileSync(path.join(__dirname, 'migracion.sql'), {encoding: "utf-8"})

    pool.query(data)
    .then(() => console.log('Ap'))
    .catch(console.error)
    .finally(() => pool.end())
}

module.exports = {
    getUsersDB,
    getUserLoginDB,
    getAdminUserDB,    
    postUserDB,
    deleteUserDB,
    updateUserDB,
    migrar,
}