const express = require('express');
const router = express.Router();
const ewelink = require('ewelink-api');
var inicio = Date.now();
router.get('/ewelink/get-devices', async(req, res)=>{
    try {
        const connection = new ewelink({
  //       const connection = {    
            email: 'bachediaz.control@gmail.com',
            password: 'Bpjm2828',
            region: 'us'
        });
     //    };
        /* get all devices */
        const devices = await connection.getDevices();
        console.log(devices);

        var fin = Date.now();
        console.log(fin);
        console.log("delay ="+(fin-inicio)/1000 + "segundos");

/* get specific devide info */
//   const device = await connection.getDevice('<your device id>');
// console.log(device);

/* toggle device */
//await connection.toggleDevice('<your device id>');
        const response = {
            status: "success",
            data: "nombre1",
            nombre: "nombre2"
        }
        console.log(response);
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