import { Request, Response } from 'express'; // Importa os tipos Request e Response do pacote express
import { Carro } from "../model/Carro"; // Importa a classe Carro do modelo correspondente

// Define a classe CarroController que herda da classe Carro
class CarroController extends Carro {
    // Método estático que busca todos os carros
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método listarCarros para obter a lista de carros
            const listaDeCarros = await Carro.listarCarros();
            // Retorna a lista de carros com status 200 (OK)
            res.status(200).json(listaDeCarros);
        } catch (error) {
            // Em caso de erro, registra o erro no console
            console.log(`Erro ao acessar método herdado: ${error}`);
            // Retorna uma mensagem de erro com status 400 (Bad Request)
            res.status(400).json("Erro ao recuperar as informações dos carros.");
        }
    }
}

// Exporta a classe CarroController como padrão para uso em outros módulos
export default CarroController;
