//requires
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//models import
import User from '../models/user.js';

router.get('/new-user',async(req,res)=>{
    try {
        const user = await User.create({
            name: "Carlos",
            email: "b@b.com",
            password: "121212",
        });
        res.json({"status": "success"})  
    } catch (error) {
        res.json({"status": "error"}) 
    }

});
//GET ->req.query
//POST ->req.body
//AUTH
//Register
router.post("/register",async(req,res)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            name: name,
            email: email,
            password:encryptedPassword
        }    
        const user = await User.create(newUser);
        console.log(user);
        const toSend = {
            status:"success"
        }
        res.json(toSend);
    } catch (error) {
        console.log("error register endpoint"+error);
        const toSend = {
            status:"error",
            error: error
        };
        res.status(500).json(toSend);
    }

});
//Login
router.post("/login", async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    var user = await User.findOne({email: email});
    if (!user) {
        const toSend = {
            status:"error",
            error:"invalid credentials"
        };    
        return res.status(401).json(toSend);  
    }
    if (bcrypt.compareSync(password, user.password)){
        user.set('password',undefined,{strict: false});
        const token = jwt.sign({userData:user},'securePasswordHere', {expiresIn: 60*60*24*30});
        const toSend = {
            status:"success",
            token:token,
            userData:user
            }
             return res.json(toSend);
        }
    else{
        const toSend = {       
        status:"PASSWORD WRONG",
        error:"Invalid credentials"
        };
        res.status(401).json(toSend);   
    }
    console.log(user);
});
//CRUD
//Create
router.post("/user",(req,res)=>{

});
//Read
router.get("/user",(req,res)=>{   

});
//Update
router.put("/user",(req,res)=>{

});
//Delete
router.delete("/user",(req,res)=>{

});


module.exports = router;



