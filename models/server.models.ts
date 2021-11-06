import express from "express";
import http from "http";
import socketIO from "socket.io";
import cors from "cors";
import router from '../routes/router.routes';
import { socketscontroller } from "../controllers/sockets.controller";


export class Server {
  private static _instance: Server;
  public port: string | undefined;
  public app: express.Application;
  private httpServer: http.Server;
  public io: socketIO.Server;
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.httpServer = http.createServer(this.app);

    //se inyecta el httpServer al Socket io
    this.io = new socketIO.Server(this.httpServer,{
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

  middlewares(){
    this.app.use(cors({origin:true,credentials:true}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes(){
    this.app.use("/", router);
  }

  sockets(){
    this.io.on("connection", (cliente)=>{
      socketscontroller(cliente,this.io);
    });
  }
  start(callback?: ()=>void){
      this.httpServer.listen(this.port, callback);
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}
