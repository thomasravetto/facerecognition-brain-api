import express, { json } from "express";
import bcrypt from 'bcrypt-nodejs';
import cors from "cors";
import knex from "knex";
import handleRegister from "./routes/register.js";
import handleSignin from "./routes/signin.js";
import handleProfile from "./routes/profile.js";
import fetch from "node-fetch";
import { handleImage, handleApiCall } from "./routes/image.js";

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false},
        port: process.env.DATABASE_PORT,
        host : process.env.DATABASE_HOST, //lhost
        user : process.env.DATABASE_USER, //add your user name for the database here
        password : process.env.DATABASE_PW, //add your correct password in here
        database : process.env.DATABASE_DB //add your database name you created here
    }
})


const PORT = 3500;

const app = express();
app.use(json())
app.use(cors());

app.get("/", (req, res) => {res.send("success")})

app.post("/signin", (req, res) => handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => handleProfile(req, res, db));

app.put("/image", (req, res) => handleImage(req, res, db));

app.post("/imageurl", (req, res) => handleApiCall(req, res, fetch));

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