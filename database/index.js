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
    return pool.query("INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto) VALUES ($1,$2,$3,$4,$5,$6)", values)
}



const migrar = () => {
    const data = fs.readFileSync(path.join(__dirname, 'migracion.sql'), {encoding: "utf-8"})

    pool.query(data)
    .then(() => console.log('listo!'))
    .catch(console.error)
    .finally(() => pool.end())
}

module.exports = {
    getUsersDB,
    postUserDB,
    migrar
}