import {server} from './server'

const port: number = 3333;

server.listen (port, () => {
    console.log (`Endereço do servidor: https://localhost:${port}`);
});