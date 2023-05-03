const express = require('express');
const cors = require('cors');
const errorMessage = require('./Utils/returns.js');
const bootstrapDB = require('./Database/db_init.js');
const User = require('./Models/user.js')
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

bootstrapDB();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/login', async (req, res) => {
    console.log("user trying to log in")

    let data
    let user
    try {
        data = req.body
        if (
            !data.email || 
            !data.password
        ){
            res.send(errorMessage("Cannot include null fields"))
            throw errorMessage("Cannot include null fields")
        }
        else if (
            user = await User.findOne({
                email: data.email
            })
            == null){
                res.send(errorMessage("No account registered with email"))
                throw errorMessage("No account registered with email")
            }
        }
    catch (err){
        console.log("Login failure")
        console.log(err.errorMessage)
        return
    }

    user = await User.findOne({
        email: data.email
    })
    pword = user.password
    const comp = await validateHash(data.password, pword)

    if (!comp){
        res.send(errorMessage("Wrong password"))
        console.log("Password wrong on login")
        return
    }
    else{
        //jwt stuff
        console.log("successful")
        res.send({message: 'Successful log in'})
        
    }
})

app.post('/signup', async (req, res) => {
    console.log('post received');
    console.log(req.body);
    let data
    try {
        data = req.body;
        if (
            !data.email ||
            !data.password ||
            !data.firstname ||
            !data.lastname
        ) {
            res.send(errorMessage('Cannot include null fields'));
            throw errorMessage('cannot include null fields');
        } else if (data.password.length <= 8) {
            res.send(errorMessage('Password must be longer than 8 characters'));
            throw errorMessage('password less than 8 characters');
        } else if (data.email.length <= 3) {
            res.send(errorMessage('Email must be longer than 3 characters'));
            throw errorMessage('email must be longer than 3 characters');
        } else if (!data.email.includes('@')) {
            res.send(errorMessage('Must include a valid email'));
            throw errorMessage('must include a valid email');
        }

        user = await User.findOne({
            email: data.email
        })
        if (user != null){
            res.send(errorMessage('Email already registered with an account'));
            throw errorMessage('Email already registered with an account');  
        }
        else{
            res.send({ message: 'Successful account creation' });
        }

    } catch (err) {
        console.log('signup error');
        console.log(err.errorMessage);
        return
    }

    const hash = await createHash(data.password)
    console.log('hash = ', hash)

    const newUser = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hash
    })

    const tUser = await newUser.save()
    console.log(tUser)

    // const firstArticle = await User.findOne({});
    // console.log(firstArticle);
    console.log("User succesfully created")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

async function createHash(password){
    const saltRounds = 10
    const hash = bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            // console.log('Hash ', hash)
            return hash
        })
        .catch(err => console.error(err.message))
    return hash
}

async function validateHash(password, hash){
    const validate = bcrypt
        .compare(password, hash)
        .then(res => {
            // console.log('Hash ', hash)
            return res
        })
        .catch(err => console.error(err.message))
    return validate
}