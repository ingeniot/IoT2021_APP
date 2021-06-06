//requires
const express = require("express");
const mongoose = require("mongoose") // gestiona la interacción con mongo
const morgan = require("morgan"); // midleware que muestra salida por cada petición al servidor
const cors = require("cors");   //Políticas de acceso a la API
const colors = require("colors"); // Salidas con identificación por colores


//instances
const app = express();

//express config
app.use(morgan("tiny"));  //Indica el modo de mensajes de salida tiny:reducidos
app.use(express.json()); //permite trabajar con json
app.use(express.urlencoded({    //permite pasar parametros por el url ?param1&param2...
    extended:true
}));
app.use(cors());

module.exports = app;

//express routes
app.use('/api',require('./routes/devices.js'));
app.use('/api',require('./routes/users.js'));
app.use('/api',require('./routes/dashboards.js'));
app.use('/api',require('./routes/webhooks.js'));
app.use('/api',require('./routes/emqxapi.js'));
app.use('/api',require('./routes/saver-rules.js'));
app.use('/api',require('./routes/rules.js'));
app.use('/api',require('./routes/dataprovider.js'));
//listener

app.listen(3001, () => {
    console.log("API server listening in port 3001");
});

//endpoints
/*
app.get("/api", (req, res) => {
    console.log("Hello API 2");
    res.send("Hello IOT API 2");

});*/

//mongo conection
const mongoUserName = "ingeniot";
const mongoPassword = "ingeniot2828";
const mongoHost = "localhost";
const mongoPort = "27017";
const mongoDatabase = "ingeniot"

var uri = "mongodb://" + mongoUserName + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDatabase;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    authSource: "admin",
};
        mongoose.connect(uri,options).then(()=>{
        console.log("\n");
        console.log("******************************".green);
        console.log("* Mongo sucesfully connected!*".green);
        console.log("******************************".green);
        console.log("\n");

    },(err)=>{
        console.log("\n");
        console.log("******************************".red);
        console.log("* Mongo Connection Failed!*".red);
        console.log("******************************".red);
        console.log("\n");    
        console.log(error);
    }
    );

