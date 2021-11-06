"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_models_1 = require("./models/server.models");
require('dotenv').config();
var server = server_models_1.Server.instance;
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
