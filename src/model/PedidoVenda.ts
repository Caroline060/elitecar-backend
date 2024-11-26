import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Pedido de Venda.
 */
export class PedidoVenda {
    /**
     * Identificador único do pedido de venda.
     */
    private idPedido: number = 0;
    /**
     * Identificador do carro associado ao pedido de venda.
     */
    private idCarro: number;
    /**
     * Identificador do cliente associado ao pedido de venda.
     */
    private idCliente: number;
    /**
     * Data do pedido de venda.
     */
    private dataPedido: Date;
    /**
     * Valor total do pedido.
     */
    private valorPedido: number;

    /**
     * Construtor da classe PedidoVenda.
     * @param idCarro - Identificador do carro.
     * @param idCliente - Identificador do cliente.
     * @param dataPedido - Data do pedido.
     * @param valorPedido - Valor do pedido.
     */
    constructor(idCarro: number, idCliente: number, dataPedido: Date, valorPedido: number) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /**
     * Obtém o identificador do pedido.
     * @returns O identificador do pedido.
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Define o identificador do pedido.
     * @param idPedido - Novo identificador do pedido.
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Obtém o identificador do carro.
     * @returns O identificador do carro.
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define o identificador do carro.
     * @param idCarro - Novo identificador do carro.
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Obtém o identificador do cliente.
     * @returns O identificador do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente.
     * @param idCliente - Novo identificador do cliente.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Obtém a data do pedido.
     * @returns A data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido.
     * @param dataPedido - Nova data do pedido.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Obtém o valor do pedido.
     * @returns O valor do pedido.
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor do pedido.
     * @param valorPedido - Novo valor do pedido.
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    /**
     * Busca e retorna uma lista de pedidos de venda do banco de dados.
     * @returns Um array de objetos do tipo PedidoVenda em caso de sucesso ou null se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "pedido_venda".
     * - Os dados retornados são utilizados para instanciar objetos da classe PedidoVenda.
     * - Cada pedido de venda instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Caso ocorra uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna null.
     */
    static async listagemPedidos(): Promise<Array<PedidoVenda> | null> {
        const listaDePedidos: Array<PedidoVenda> = [];

        try {
            const querySelectPedidos = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(querySelectPedidos);

            respostaBD.rows.forEach((linha: any) => {
                const novoPedidoVenda = new PedidoVenda(
                    linha.id_carro,
                    linha.id_cliente,
                    linha.data_pedido,
                    parseFloat(linha.valor_pedido)
                );

                novoPedidoVenda.setIdPedido(linha.id_pedido);

                listaDePedidos.push(novoPedidoVenda);
            });

            return listaDePedidos;
        } catch (error) {
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }
/**
     * Realiza o cadastro de pedido no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Pedido e insere seus dados (idCarro,idCliente,dataPedido,valorPedido)
     * na tabela pedidoVEndas do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {PedidoVenda} pedido_venda - Objeto contendo os dados do pedido que será cadastrado. O objeto pedidoVenda
     *                        deve conter os métodos getIdCarro(), getIdcliente(), getDatapedido(),`getValorPedido` 
     *                        que retornam os respectivos valores do cliente.
     * @returns {Promise<boolean>} - Retorna true se o pedido foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */

    static async cadastroPedidoVenda(pedidoVenda: PedidoVenda): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertPedidoVenda = `INSERT INTO carro (nome, cpf, telefone)
                                    VALUES
                                    (${pedidoVenda.getIdCliente()}, 
                                    ${pedidoVenda.getIdCarro()}, 
                                    ${pedidoVenda.getValorPedido()},
                                    ${pedidoVenda.getDataPedido()}, 
                                    RETURNING id_cliente;`;
            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertPedidoVenda);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Pedido cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
                // true significa que o cadastro foi feito
                return true;
            }
            
            // false significa que o cadastro NÃO foi feito.
            return false;
        
            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /**
 * Remove um pedido de venda do banco de dados com base no ID fornecido.
 * 
 * @param {number} idPedido - O identificador único do pedido que será removido.
 * @returns {Promise<boolean>} - Retorna `true` se o pedido foi removido com sucesso,
 * ou `false` caso contrário.
 * 
 * - A função constrói uma consulta SQL `DELETE` para excluir um registro da tabela 
 * `pedido_venda` onde o `id_pedido` coincide com o valor fornecido.
 * - Caso a exclusão seja realizada com sucesso (indicado pelo `rowCount` do resultado
 * ser diferente de 0), um log de sucesso é exibido, e a função retorna `true`.
 * - Se o pedido não for encontrado ou a exclusão não for bem-sucedida, retorna `false`.
 * - Tratamento de erros é implementado para capturar e logar possíveis exceções 
 * que ocorram durante a execução da consulta SQL.
 */

    // Declaração da função assíncrona que remove um pedido pelo ID
    static async removerPedido(idPedido: number): Promise<boolean> {
        try {
            // Declaração da query SQL para excluir o pedido com o ID fornecido
            const queryDeletePedido = `DELETE FROM pedido_venda WHERE id_pedido = ${idPedido}`;
        
            // Executa a consulta SQL no banco de dados e armazena a resposta
            const respostaBD = await database.query(queryDeletePedido);

            // Verifica se algum registro foi afetado pela operação de exclusão
            if (respostaBD.rowCount != 0) {
                // Loga uma mensagem indicando que o pedido foi removido com sucesso
                console.log(`Pedido removido com sucesso!`);
                return true; // Retorna verdadeiro para indicar sucesso
            }
        
            // Retorna falso se nenhum registro foi removido (pedido inexistente ou erro)
            return false;
        } catch (error) {
            // Loga uma mensagem de erro genérica caso uma exceção ocorra
            console.log(`Erro ao remover pedido. Verifique os logs para mais detalhes.`);
            // Exibe o erro no console para depuração
            console.log(error);
            return false; // Retorna falso em caso de falha na execução
        }
    }
}