const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const passport = require('passport');


const db = require('./src/database');
const bcrypt = require('./src/encrypt');
const { nameValidate, passwordValidate, emailValidate } = require('./src/inputValidate');
const dbKey = require('./src/db');

const app = express();

let sessionStore = new MYSQLStore(dbKey);


//config

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userID",
    secret: "hola",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        expires: 1000*60*60*24 //24hours
    }
}));


//routes

app.get('/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

app.get('/logout', async (req, res) => {
    req.session.destroy();
});

app.post('/register', async (req, res) =>{
    if(!req.session.user){
    const mailWithoutSpaces = req.body.mail.replace(/\s+/g, ''); 
    if(nameValidate(req.body.username)  && passwordValidate(req.body.password) && emailValidate(mailWithoutSpaces)){
        const pass = await bcrypt.encryptPassword(req.body.password);
        const newUser = {
            username: req.body.username,
            password: pass,
            mail: mailWithoutSpaces,
        }
    
        const insertUser = 'INSERT INTO users SET ?';
        
        await db.query(insertUser, [newUser], async (err, result) => {
            if(err){
                res.send({message: "Email ya registrado"});

            }else{
                const serchUser = 'SELECT * FROM users WHERE mail = ?';
                await db.query( serchUser , [mailWithoutSpaces], async (err, result) => {
                    if(err){
                        res.send({err: err});
                    }
                    if(result.length > 0){
                        const resultPassword = await bcrypt.matchPassword(req.body.password, result[0].password);
                        if(resultPassword){
                            req.session.user = result;
                            res.send(result);
                            
                        }else{
                            res.send({message: "Contraseña incorrecta"});
                        }
                    }else{
                         res.send({message: "Mail no registrado"});
                    }
                   
                });
            }
        });
    }
}
    
});


app.post('/login', async (req, res) => {
    if(!req.session.user){
        const mailLogin = req.body.mail.replace(/\s+/g, ''); 
        const passwordLogin = req.body.password.replace(/\s+/g, ''); 
        if(passwordValidate(passwordLogin) && emailValidate(mailLogin)){
            const userDB = 'SELECT * FROM users WHERE mail = ?';
    
        await db.query( userDB , [mailLogin], async (err, result) => {
            if(err){
                res.send({err: err});
            }
            if(result.length > 0){
                const resultPassword = await bcrypt.matchPassword(passwordLogin, result[0].password);
                if(resultPassword){
                    req.session.user = result;
                    res.send(result);
                    
                }else{
                    res.send({message: "Error en email o contraseña"});
                }
            }else{
                 res.send({message: "Error en email o contraseña"});
            }
           
        });
        }else{
            res.send({message: "Error en email o contraseña"});
        }
    }
});


//server

app.listen(5000, () => {
    console.log("I'm listening");
});



function errorHandler (err, req, res, next){
    if(err){
        res.send({err: err});
    }
}

//app.use(errorHandler); //catches errors and does not crash the server