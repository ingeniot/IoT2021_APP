//requires

const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/authentication.js');
const axios = require("axios");
const colors = require("colors");
var mqtt = require('mqtt');

//models import
import Data from '../models/data.js';
import Device from '../models/device.js';
import AlarmRule from '../models/emqx_alarm_rule.js';
import Notification from '../models/notification.js';

//Global variables
var client;


//Start
setTimeout(() => {
    console.log("Start MQTT connection");
    startMqttClient();
}, 3000);

 /********************
 *                  *
      Endpoints         
 *                  *
 ********************/  
router.post('/saver-webhook', async(req,res)=>{
   // console.log(req);
    try {
        if(req.headers.token != "121212"){
            res.sendStatus(404);
            return;
        }
        const data = req.body;

        const splittedTopic = data.topic.split("/");
        console.log(splittedTopic);
        const dId = splittedTopic[1];
        const variable = splittedTopic[2];
        console.log(data.userId);
        console.log(dId);
        var result = await Device.find({userId: data.userId, dId:dId});
        console.log(result.length);
        if(result.length == 1){
            var newData = {
                userId: data.userId,
                dId: dId,
                variable: variable,
                value: data.payload.value,
                createdTime: Date.now()      
            };
            console.log(newData);
            const dataStorage = await Data.create(newData);
            console.log(data);

        }
        console.log(data);
        return res.sendStatus(200);
   
    } catch (error) {
        console.log(error);
        const response = {
            status: "error",
            error: error
        }
        return res.status(500).json(response);   
                    
    }

});

router.post('/alarm-webhook', async(req,res)=>{
    // console.log(req);
     try {
         if(req.headers.token != "121212"){
             res.sendStatus(404);
             return;
         }
         res.sendStatus(200);
         const alarm = req.body;
         console.log(alarm);
         updateAlarmCounter(alarm.emqxRuleId);
         const prevNot = await Notification.find({dId:alarm.dId, emqxRuleId:alarm.emqxRuleId}).sort({createdTime:-1}).limit(1);
         if(prevNot == 0){
            console.log("alarm notification");
            saveNotification(alarm);
            sendMqttNot(alarm);            
         }
         else{  
            const prevNotMins = (Date.now()-prevNot[0].createdTime) / 60000;
            if(prevNotMins>alarm.triggerTime){
                console.log("Triggered alarm");
                saveNotification(alarm);
                sendMqttNot(alarm);
            }
         }
  
     } catch (error) {
         console.log(error);
         return res.sendStatus(500);
                     
     }
 
 }); 

router.get("/notifications", checkAuth, async(req, res)=>{
try {
    const userId = req.userData._id;
    const notifications = await getNotifications(userId);
    console.log("notifications"+notifications);
    const response ={
        status: "success",
        data: notifications
    };
    res.json(response);
} catch (error) {
    console.log("ERROR GETTING NOTIFICATIONS");
    console.log(error);
    const response ={
        status: "error",
        error: error
    };
    return res.status(500).json(response);
    
}
 });
 router.put("/notifications", checkAuth, async(req, res)=>{
    try {
        const userId = req.userData._id;
        const notificationId = req.body.notId;
        await Notification.updateOne({userId: userId, _id: notificationId},{readed: true});
        const response ={
            status: "success",
        };
        res.json(response);
    } catch (error) {
        console.log("ERROR UPDATING NOTIFICATION STATUS");
        console.log(error);
        const response ={
            status: "error",
            error: error
        };
        return res.status(500).json(response);
        
    }
     });
 /********************
 *                  *
      Functions         
 *                  *
 ********************/  
// MQTT FUNCTIONS
function startMqttClient(){
    const options = {
        port:1883,
        host:'localhost',
        clientId:'webhook_superuser'+Math.round(Math.random()*(0-10000)*-1),
        username: 'superuser',
        password: 'superuser',
        keepalive: 60,
        reconnectPeriod: 5000,
        protocolId:'MQIsdp',
        protocolVersion: 3,
        clean: true,
        encoding: 'utf8'
    };

    client = mqtt.connect('mqtt://'+'localhost',options);

    client.on('connect',function(){
        console.log("MQTT CONNECTION->SUCCESS".bgGreen);
        console.log("\n");
    });

    client.on('reconnect',(error)=>{
        console.log("RECONNECTING MQTT");
        console.log(error);
    });

    client.on('error',(error)=>{
        console.log("MQTT CONNECTION FAIL ->");
        console.log(error);
    });
}  

function sendMqttNot(not){
    const  topic = not.userId + "/dummy-dId/dumy-var/notif";
    const msg = 'The rule when the'+ not.variableFullName + 'is' + not.condition + 'than' + not.value;
    client.publish(topic,msg);
}
// Notification FUNCTIONS 

function saveNotification(alarm){
    var newNot=alarm;
    newNot.createdTime=Date.now();
    newNot.readed=false;
    Notification.create(newNot);

}

async function updateAlarmCounter(emqxRuleId){
    try {
        await AlarmRule.updateOne({emqxRuleId:emqxRuleId},{$inc:{counter:1}});       
    } catch (error) {
        console.log(error);
    }
}

async function getNotifications(userId){
    try {
        const res = await Notification.find({userId: userId, readed:false});
        return res;
    } catch (error) {
        return false;        
    }
}

module.exports = router;