const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const bcrypt = require('./encrypt');


passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password'
}, async (username, password, done) => {
    const userDB = 'SELECT * FROM users WHERE mail = ?';
    await db.query( userDB , [username], async (err, result) => {
        if(err){
            return done({err: err});
        }
        if(result.length > 0){
            const resultPassword = await bcrypt.matchPassword(password, result[0].password);
            if(resultPassword){
                return done(null, result, result[0].username);
                
            }else{
                return done(null, false, {message: "Mail o contraseña incorracta"});
            }
        }else{
            return done(null, false, {message: "Mail o contraseña incorracta"});
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user[0].mail);
});

passport.deserializeUser(async (mailUser, done) => {
    console.log(mailUser);
    await db.query('SELECT * FROM users WHERE mail = ?', [mailUser], (err, result) => {
        console.log(result[0].mail);
        done(null, mailUser)
    });
});