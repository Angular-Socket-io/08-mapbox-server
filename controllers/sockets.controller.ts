import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import {Mapa} from "../classes/mapa";
import {Marcador} from "../classes/marcador";

export const mapa = new Mapa();

export const socketscontroller = (cliente:Socket,io: socketIO.Server) => {
    console.log('Cliente Conectado');

    cliente.on('disconnect', () =>{
        console.log('Cliente Desconectado');
    });

    cliente.on('marcador-nuevo', (marcador:Marcador) =>{
        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo',marcador);
    });

    cliente.on('marcador-borrar', (id:string) =>{
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrado',id);
    });

    cliente.on('marcador-mover', (marcador:Marcador) =>{
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover',marcador);
    });
}




