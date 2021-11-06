"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_models_1 = require("../models/server.models");
var grafica_1 = require("../classes/grafica");
var sockets_controller_1 = require("../controllers/sockets.controller");
var router = express_1.Router();
var grafica = new grafica_1.Grafica;
// Mapa
router.get('/mapa', function (req, res) {
    res.json(sockets_controller_1.mapa.getMarcadores());
});
////
router.get('/grafica', function (req, res) {
    var data = grafica.getDataGrafica();
    res.json({
        ok: true,
        data: data
    });
});
router.post('/grafica', function (req, res) {
    var numPregunta = req.body.pregunta;
    var valor = Number(req.body.valor);
    var payload = { numPregunta: numPregunta, valor: valor };
    var server = server_models_1.Server.instance;
    grafica.incrementarValor(numPregunta, valor);
    var data = grafica.getDataGrafica();
    server.io.emit('cambiar-grafica', data);
    res.json({
        ok: true,
        data: data
    });
});
exports.default = router;
