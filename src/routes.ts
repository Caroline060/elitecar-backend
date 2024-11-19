import { Request, Response, Router } from "express";
import { CarroController } from "./controller/CarroController";
import { ClienteController } from "./controller/ClienteController";
import { PedidoVendaController } from "./controller/PedidoVendaControler";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA CARROS\
*/ 
// Rota para listar os carros
router.get("/lista/carros", CarroController.todos);
//Rota para cadastrar novo carro
router.post("/novo/carro", CarroController.novo);
//Rota para remover carro
router.delete("/remover/carro/:idCarro", CarroController.remover);
//Rota para atualizar carro
router.put("/atualizar/carro/:idCarro", CarroController.atualizar);

/* 
* ROTAS PARA CLIENTES
*/ 
// Rota para listar os clientes
router.get("/lista/clientes", ClienteController.todos);
//Rota para cadastrar novo cliente
router.post("/novo/clientes", ClienteController.novo);
//Rota para remover cliente
router.delete("/remover/cliente/:idCliente", ClienteController.remover);
/* 
* ROTAS PARA PEDIDOS
*/ 
// Rota para listar os pedidos
router.get("/lista/pedidos", PedidoVendaController.todos);
//Rota para cadastrar novo pedido
router.post("/novo/pedidos", PedidoVendaController.novo);
//Rota para remover pedido
router.delete("/remover/pedido/:idPedido", PedidoVendaController.remover);

// exportando as rotas
export { router };