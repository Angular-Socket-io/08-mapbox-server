"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var cors_1 = __importDefault(require("cors"));
var router_routes_1 = __importDefault(require("../routes/router.routes"));
var sockets_controller_1 = require("../controllers/sockets.controller");
var Server = /** @class */ (function () {
    function Server() {
        this.port = process.env.PORT;
        this.app = express_1.default();
        this.httpServer = http_1.default.createServer(this.app);
        //se inyecta el httpServer al Socket io
        this.io = new socket_io_1.default.Server(this.httpServer, {
            cors: {
                origin: true,
                methods: ["GET", "POST"]
            }
        });
        //middlewares
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();
        //sockets
        this.sockets();
    }
    Server.prototype.middlewares = function () {
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        this.app.use("/", router_routes_1.default);
    };
    Server.prototype.sockets = function () {
        var _this = this;
        this.io.on("connection", function (cliente) {
            sockets_controller_1.socketscontroller(cliente, _this.io);
        });
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
    };
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    return Server;
}());
exports.Server = Server;
