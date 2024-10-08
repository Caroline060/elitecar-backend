import {Request, Response, Router} from "express";
import CarroController from "./controller/CarroController";
import ClienteController from "./controller/ClienteController";
import PedidoVendaController from "./controller/PedidoVendaController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({mensagem: "Olá, mundo!"});
});

router.get('/carro', CarroController.todos);
router.get('/cliente', ClienteController.todos);
router.get('/pedido', PedidoVendaController.todos);

export {router};