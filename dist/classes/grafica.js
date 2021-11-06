"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafica = void 0;
var Grafica = /** @class */ (function () {
    function Grafica() {
        this.pregunta = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
        this.valor = [0, 0, 0, 0];
    }
    Grafica.prototype.getDataGrafica = function () {
        return [{ data: this.valor, label: 'Preguntas' }];
    };
    Grafica.prototype.incrementarValor = function (pregunta, valor) {
        pregunta = pregunta.toLowerCase().trim();
        for (var i in this.pregunta) {
            if (this.pregunta[i].toLowerCase().trim() === pregunta) {
                this.valor[i] += valor;
            }
        }
        return this.getDataGrafica();
    };
    return Grafica;
}());
exports.Grafica = Grafica;
