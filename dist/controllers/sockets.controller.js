"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketscontroller = exports.mapa = void 0;
var mapa_1 = require("../classes/mapa");
exports.mapa = new mapa_1.Mapa();
var socketscontroller = function (cliente, io) {
    console.log('Cliente Conectado');
    cliente.on('disconnect', function () {
        console.log('Cliente Desconectado');
    });
    cliente.on('marcador-nuevo', function (marcador) {
        exports.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', function (id) {
        exports.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrado', id);
    });
    cliente.on('marcador-mover', function (marcador) {
        exports.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.socketscontroller = socketscontroller;
