const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const passport = require('passport');
const User = require('../models/user.js')


//Necessary for issuing the jwt
const pathToKey = path.join(__dirname, "../", 'id_rsa_priv.pem')
// console.log(pathToKey)
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1';
  
    const payload = {
        sub: _id,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
    //that simple
}

const genPassword = async (plaintextPassword) => {
    console.log("works ")
    const saltRounds = 10;
    const hash = await bcrypt.hash(plaintextPassword, saltRounds)
    // console.log(hash)
    return hash
};

router.get('/', (req, res) => {
    res.sendFile(path.dirname(__dirname) + "/public/home.html");
})

router.get('/login', (req, res) => {
    res.sendFile(path.dirname(__dirname) + "/public/login.html");
})

router.post('/login', (req, res) => {
    console.log("login recieved", req.body)
    const { email,password } = req.body;

    if(!email) {
        console.log("no info sent")
        return
    }
    User.findOne({ email: email}, async (err, user) => {
        if(err){
            return res.status(400).json({ error: `an error occured: ${err}`})
        } else if (!user) {
            res.status(400).json({ error: "unknown username"})
        } else {
            console.log("found the user", user.password)
            const valid = await bcrypt.compare(password, user.password);
            console.log("is valid", valid);
            
            if (!valid) {
                console.log("it's not valid")
                res.status(400).json({ error: "Wrong password"}) 
            } else {
                const tokenObj =  issueJWT(user)
                res.status(200).json({ 
                    user: { 
                        username: user.username, 
                        email: user.email, 
                        createdAt: user.createdAt
                    }, 
                    token: tokenObj.token, 
                    expiresIn: tokenObj.expires 
                    }
                  );
            } 
        }
    })
});

router.get('/register', (req, res) => {
    res.sendFile(path.dirname(__dirname) + "/public/register.html");
})

router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    console.log("body >>>", req.body)
    console.log("these are recieved", email, password, password2)
    if (!req.body.email) {
        console.log("no info sent")
        return
    } 
    if (password !== password2) {
        res.status(401).json({ error: "Passwords are not identical!" })
        return
    }
    User.findOne({ email: email}, async (err, data) => {
        if(err) {
            return res.status(400).json({ error: `an error occured: ${err}` })
        } else if(data) {
            return res.status(400).json({ error: "User exists in database" }) 
        } else {
            const passwordToSave = await genPassword(password);
            const newUser = new User({
                email: email,
                password: passwordToSave
            });

            newUser.save()
                .then(async user => {
                    console.log("registered new user")
                    const jwt = await issueJWT(user)
                    res.status(201).json(
                        {
                            user: {
                                email: user.email,
                            },
                            token: jwt.token,
                            expiresIn: jwt.expires
                        }
                    ).catch(console.log)

                })
        }
        
    })
})

module.exports = router;


