const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = require('./src/database');
const bcrypt = require('./src/encrypt');
const inputValidate = require('./src/inputValidate');
const { nameValidate, passwordValidate, emailValidate } = require('./src/inputValidate');

const app = express();


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
    cookie: {
        expires: 60*60*24 //24hours
    }
}));


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
    const nameWithoutSpaces = req.body.username.replace(/\s+/g, '');
    const lastnameWithoutSpaces = req.body.lastname.replace(/\s+/g, ''); 
    const passwordWithoutSpaces = req.body.password.replace(/\s+/g, ''); 
    const mailWithoutSpaces = req.body.mail.replace(/\s+/g, ''); 
    const phoneWithoutSpaces = req.body.username.replace(/\s+/g, '');
    if(nameValidate(nameWithoutSpaces) && nameValidate(lastnameWithoutSpaces) && passwordValidate(passwordWithoutSpaces) && emailValidate(mailWithoutSpaces)){
        const pass = await bcrypt.encryptPassword(req.body.password);
        const newUser = {
            username: req.body.username,
            lastname: req.body.lastname,
            password: pass,
            mail: req.body.mail,
            phone: req.body.phone
        }
        const mailLogin = req.body.mail;
        const passwordLogin = req.body.password;
    
        const insertUser = 'INSERT INTO users SET ?';
    
        await db.query(insertUser, [newUser], async (err, result) => {
            if(err){
                res.send({message: "Error al registrar el usuario"});
            }else{
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
                            res.send({message: "Contraseña incorrecta"});
                        }
                    }else{
                         res.send({message: "Mail no registrado"});
                    }
                   
                });
            }
        });
    }
    
});

app.post('/login', async (req, res) => {
  
    const mailLogin = req.body.mail;
    const passwordLogin = req.body.password;
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
                res.send({message: "Contraseña incorrecta"});
            }
        }else{
             res.send({message: "Mail no registrado"});
        }
       
    });
});

app.listen(5000, () => {
    console.log("I'm listening");
})