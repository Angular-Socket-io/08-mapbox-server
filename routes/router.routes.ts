import {Request, Response, Router} from 'express'
import { Server } from '../models/server.models';
import {Grafica} from "../classes/grafica";
import { mapa } from '../controllers/sockets.controller';

const router = Router();
const grafica = new Grafica;


// Mapa
router.get('/mapa', ( req: Request, res: Response  ) => {
    res.json( mapa.getMarcadores() );
});


////
router.get('/grafica',(req,res) =>{
    const data = grafica.getDataGrafica()
    res.json({
        ok: true,
        data
    })
})

router.post('/grafica',(req, res) =>{
    const numPregunta = req.body.pregunta;
    const valor = Number(req.body.valor);
    const payload = {numPregunta, valor};
    const server = Server.instance;
    
    grafica.incrementarValor(numPregunta, valor)
    const data = grafica.getDataGrafica()
    server.io.emit('cambiar-grafica',data);
    res.json({
        ok: true,
        data
    })
})


export default router;