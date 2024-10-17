import { Request, Response } from 'express'; // Importa os tipos Request e Response do pacote express
import { Cliente } from "../model/Cliente"; // Importa a classe Cliente do modelo correspondente

// Define a classe ClienteController que herda da classe Cliente
class ClienteController extends Cliente {
    // Método estático que busca todos os clientes
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método listarClientes para obter a lista de clientes
            const listaDeClientes = await Cliente.listarClientes();
            // Retorna a lista de clientes com status 200 (OK)
            res.status(200).json(listaDeClientes);
        } catch (error) {
            // Em caso de erro, registra o erro no console
            console.log(`Erro ao acessar método herdado: ${error}`);
            // Retorna uma mensagem de erro com status 400 (Bad Request)
            res.status(400).json("Erro ao recuperar as informações dos clientes.");
        }
    }
}

// Exporta a classe ClienteController como padrão para uso em outros módulos
export default ClienteController;
