const express = require('express');
const cors = require('cors');
const errorMessage = require("./Utils/returns.js")

const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.post('/signup', (req, res) => {
    console.log("post received");
    console.log(req.body)
    try{
    let data = req.body
    if (!data.email || !data.password || !data.firstname || !data.lastname){
        res.send(errorMessage("Cannot include null fields"))
        throw errorMessage("cannot include null fields")
    }
    else if (data.password.length <= 8 ){
        res.send(errorMessage('Password must be longer than 8 characters'))
        throw errorMessage("cannot include null fields")

    }
    else if (data.email.length <= 3){
        res.send(errorMessage('Username must be longer than 3 characters'))
        throw errorMessage("cannot include null fields")
    }
    res.send({message: "Successful account creation"})
    }
    catch(err){
        console.log("signup error")
        console.log(err.errorMessage)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

