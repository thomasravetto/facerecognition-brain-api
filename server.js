const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require("knex");
const register = require("./routes/register");
const signin = require("./routes/signin");
const profile = require("./routes/profile");
const image = require("./routes/image");

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1', //localhost
    user : 'thomasravetto', //add your user name for the database here
    password : '', //add your correct password in here
    database : 'facerecognition' //add your database name you created here
    }
})


const PORT = 3500;

const app = express();
app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {res.send("success")})

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(PORT, () => {
    console.log("Working on port:", PORT)
})


/*
API
res => This is working
/signin => POST -> success/fail
/register => POST -> user
/profile/:userId => GET -> user
/image => PUT -> user (updating rank of user)
*/