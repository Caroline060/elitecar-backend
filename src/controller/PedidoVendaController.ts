import { Request, Response } from 'express'; // Importa os tipos Request e Response do pacote express
import { PedidoVenda } from "../model/PedidoVenda"; // Importa a classe PedidoVenda do modelo correspondente

// Define a classe PedidoVendaController que herda da classe PedidoVenda
class PedidoVendaController extends PedidoVenda {
    // Método estático que busca todos os pedidos de venda
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método listarPedidos para obter a lista de pedidos de venda
            const listaDePedidos = await PedidoVenda.listarPedidos();
            // Retorna a lista de pedidos com status 200 (OK)
            res.status(200).json(listaDePedidos);
        } catch (error) {
            // Em caso de erro, registra o erro no console
            console.log(`Erro ao acessar método herdado: ${error}`);
            // Retorna uma mensagem de erro com status 400 (Bad Request)
            res.status(400).json("Erro ao recuperar as informações dos pedidos de venda.");
        }
    }
}

// Exporta a classe PedidoVendaController como padrão para uso em outros módulos
export default PedidoVendaController;
