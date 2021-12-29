const mysql = require('mysql');
const { promisify } = require('util');

const db = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tiendaDataBase'
};

const pool = mysql.createPool(db);

promisify(pool.query); //Para poder usar promesas y async await en cosultas a la db

module.exports = pool;