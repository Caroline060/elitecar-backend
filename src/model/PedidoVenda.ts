import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool

/* Classe que representa PedidoVenda */
export class PedidoVenda{

    /* Identificador do Pedido */
    private idPedido: number = 0;
    /* identificador do carro */
    private idCarro: number = 0;
    /* identificador do cliente */
    private idCliente: number = 0;
    /* data do pedido de venda*/
    private dataPedido: Date;
    /* valor do pedido de venda */
    private valorPedido: number = 0;

    /**
     * Construtor da classe Pedido
     * 
     * @param idCarro Carro a ser vendido
     * @param idCliente Cliente a fazer a compra
     * @param dataPedido data do pedido de venda
     * @param valorPedido valor do pedido
     */
    constructor (
        idCarro: number,
        idCliente: number,
        dataPedido: Date,
        valorPedido: number
    ){
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do pedido
     * @returns o identificador do pedido
     */
    public getIdPedido(): number {
        return this.idPedido;
    }
    /**
     * Atribui um valor ao identificador do pedido
     * @param idPedido novo identificado do pedido
     */
    public setIdPedido(idPedido: number): void{
        this.idPedido = idPedido;
    }

    /**
     * Retorna a data do pedido.
     *
     * @returns {Date} a data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido; 
    }

    /**
     * Define a data do pedido.
     * 
     * @param dataPedido - a data do pedido a ser definida.
     */
    public setDataPedido(dataPedido: Date): void{
        this.dataPedido = dataPedido;
    }

    /**
     * Retorna o valor do pedido.
     *
     * @returns {number} o valor do pedido.
     */ 
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor do pedido.
     *
     * @param valorPedido - o valor do pedido feito.
     */
    public setValorPedido(valorPedido: number): void{
        this.valorPedido = valorPedido;
    }
     //MÉTODO PRA ACESSAR BANCO DE DADOS
     //CRUD Creat - Read - Update - Delete
    static async listarPedidos(): Promise<Array<PedidoVenda> | null> {
        let listaDePedidos: Array<PedidoVenda> = [];

        try {
            //QUERY para consulta de banco de dados
            const querySelectPedido = `SELECT * FROM Pedido_venda;`;

            //executa a QUERY no banco de dados
            const respostaBD = await database.query(querySelectPedido);
            
            respostaBD.rows.forEach((pedido) => {
                let novoPedido = new PedidoVenda(
                    pedido.id_carro,
                    pedido.id_cliente,
                    pedido.data_pedido,
                    pedido.valor_pedido,
                );
                novoPedido.setIdPedido(pedido.id);
                listaDePedidos.push(novoPedido);
            });

            return listaDePedidos;
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`);
            return null;
        }
    }

}