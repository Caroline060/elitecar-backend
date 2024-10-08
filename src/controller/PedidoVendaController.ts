import {Request, Response} from 'express';
import { PedidoVenda } from "../model/PedidoVenda";

class PedidoVendaController extends PedidoVenda{
    static async todos(req: Request, res: Response) {
        try {
            const listaDePedidos = await PedidoVenda.listarPedidos();
            res.status(200).json(listaDePedidos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações dos carros.");
        }
    }

}

export default PedidoVendaController;