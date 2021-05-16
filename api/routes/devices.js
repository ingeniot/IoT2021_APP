//requires
const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/authentication.js');
import { reset } from 'colors';
/********************
 *                  *
  Models          
 *                  *
 ********************/     
import Device from '../models/device.js'

/********************
 *                  *
        API             
 *                  *
 ********************/ 
/*
        //endpoints
router.get("/devices", (req, res) => {
    console.log("Hello API 2");
    res.send("Hello IOT API form devices.js");

});*/

//Json test
/*
{
    "newDevice":{
        "userId":"aaaa",
        "dId":"12121212",
        "name":"home",
        "templateName":"esp32 template",
        "templateId":"aaaa"
    }
} 
*/

//Create
router.post("/device",checkAuth,async(req,res)=>{
    try {
        const userId = req.userData._id;    
        var newDevice = req.body.newDevice;
        console.log(newDevice);
        newDevice.userId = userId;
        newDevice.createdTime = Date.now();
        const device = await Device.create(newDevice);
        selectDevice(userId,dId)
        const toSend = {
            status:"success"
        }
        return res.json(toSend);  
    } catch (error) {
        console.log("Error creating new device" + error);
        const toSend = {
            status:"error",
            error: error
        }
        return res.status(500).json(toSend);

    }


});
//Read
router.get("/device", checkAuth, async(req,res)=>{ 
    try {
        console.log(req.userData);  
        const userId = req.userData._id; 
        const devices = await Device.find({userId: userId});
        const toSend = {
            status:"success",
            data: devices
        };
        res.json(toSend);        
    } catch (error) {
        console.log("Error geting devices");
        const toSend = {
            status: "error",
            error: error
        }; 
    return res.status(500).json(toSend);
    }

});
//Update
router.put("/device",checkAuth, (req,res)=>{
    const dId = req.body.dId;
    const userId = req.userData._id;
    console.log(dId);
    if(selectDevice(userId,dId)){
        const toSend = {
            status:"success"
        };
        res.json(toSend);  
    }
    else{
        const toSend = {
            status: "error",
            error: error
        }; 
    return res.status(500).json(toSend);

    };

});
//Delete
router.delete("/device",checkAuth,async(req,res)=>{
    try {
        const userId = req.userData._id;
        const dId = req.query.dId;
        const result = await Device.deleteOne({userId: userId, dId: dId});
        const toSend = {
            status:"success",
            data: result
        };
        return res.json(toSend);        
    } catch (error) {
        console.log("Error deleting device");
        const toSend = {
            status: "error",
            error: error,
        }; 
        return res.status(500).json(toSend);       
    }


});

/********************
 *                  *
        Functions             
 *                  *
 ********************/ 
async function selectDevice(userId, dId){
    try {

        const result = await Device.updateMany({userId: userId},{selected: false});
        const result2 = await Device.updateOne({dId: dId, userId: userId},{selected: true}); 
        console.log(dId); 
        return true;
    } catch (error) {
        console.log("Error in selected device"+error);
        return false
    }

}


module.exports = router;