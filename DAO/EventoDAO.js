import conectar from "./Conexao.js";
import Evento from "../Model/Evento.js";
export default class EventoDAO{
    //Essa classe tem como responsabilidade gravar, alterar, excluir,
    // e consultar eventos no banco de dados

    // constructor(){
    //     this.init(); //iniciailizar o banco de dados
    // }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS eventos (
            id int(11) NOT NULL AUTO_INCREMENT,
            nome varchar(255) NOT NULL,
            cidade varchar(255) NOT NULL,
            endereco varchar(255) NOT NULL,
            data date NOT NULL,
            descricao text NOT NULL,
            valor double NOT NULL,
            quantidade int(11) NOT NULL,
            status int(11) NOT NULL,
            PRIMARY KEY ('id');`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
        }
    }

    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento(nome,cidade,endereco,data,descricao,valor,quantidade,status) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
            const parametros = [
                evento.nome,
                evento.cidade,
                evento.endereco,
                evento.data,
                evento.descricao,
                evento.valor,
                evento.quantidade,
                evento.status
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();

            const sql = `UPDATE evento SET nome = ?,
                         cidade = ?,
                         endereco = ?,
                         data = ?,
                         descricao = ?,
                         valor = ?,
                         quantidade = ?,
                         status = ?
                         WHERE id = ?;`;
            const parametros = [
                evento.nome,
                evento.cidade,
                evento.endereco,
                evento.data,
                evento.descricao,
                evento.valor,
                evento.quantidade,
                evento.status,
                evento.id
            ];

            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(id){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?;`;
            const parametros = [
                id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
    }

    async consultarEvento(id = null) {
        let sql;
        let parametros = [];
    
        if (id) {
            sql = 'SELECT * FROM evento WHERE id = ?';
            parametros = [id];
        } else {
            sql = 'SELECT * FROM evento';
        }
        const conexao = await conectar();

        try {
            const [rows] = await conexao.execute(sql, parametros);
            return rows;
        } catch (erro) {
            console.error('Erro ao consultar eventos:', erro);
            throw erro;
        }
    }
}