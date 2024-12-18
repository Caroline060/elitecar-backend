import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    id_carro: number;
    idPedido: number;
    dataVenda: Date;
    valorpedido:number;
}

/**
 * A classe PedidoVendaController estende a classe PedidoVenda e é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 * - Herdando de PedidoVenda, ela pode acessar os métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response): Promise <any> {
        try {
            const listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
        
    }

    static async novo(req: Request, res: Response): Promise <any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface pedidoVendaDTO
            const pedidoVendaRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo pedidoVenda com as informações recebidas
            const novoPedidoVenda = new PedidoVenda(pedidoVendaRecebido.id_carro, 
                                        pedidoVendaRecebido.idPedido, 
                                        pedidoVendaRecebido.dataVenda,pedidoVendaRecebido.valorpedido);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedidoVenda(novoPedidoVenda);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o pedido. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao fazer o pedido. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível fazer o pedido. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover (req: Request, res: Response): Promise <any>{
        try {
            const idPedido = parseInt(req.params.idPedido as string);
         
            const respostaModelo = await PedidoVenda.removerPedido(idPedido);

            if(respostaModelo){
                return res.status(200).json({mensagem: "O pedido foi removido com sucesso ! "});
            }
            else{
                return res.status(400).json({ mensagem: "Erro ao remover o pedido. Entre em contato com o administrador do sistema."})
            }
                          
        } catch (error) {
            console.log(`Erro ao remover um pedido. ${error}`);

            return res.status(400).json({ mensagem: "Não foi possível remover o pedido. Entre em contato com o administrador do sistema." });
        }
    }
}