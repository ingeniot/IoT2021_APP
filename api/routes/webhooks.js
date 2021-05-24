//requires

const express = require("express");
const router = express.Router();
const axios = require("axios");
const colors = require("colors");

router.post('/saver-webhook', (req,res)=>{
   // console.log(req);
    try {
        const data = req.body.msg;
        console.log(data);
        const response = {
            status: "success"
        };
        return res.json(response);   
    } catch (error) {
        console.log(error);
        const response = {
            status: "error",
            error: error
        }
        return res.status(500).json(response);   
                    
    }

});

 

module.exports = router;