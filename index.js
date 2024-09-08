import express from 'express';
import session from 'express-session';
import { autenticar, verificaSessao, sair } from './seguranca/autenticar.js';
import Evento from "./Model/Evento.js";


const host = '0.0.0.0';
const porta = 3000;
const app = express();

//a biblioteca qs será utilizada para tratar os parâmetros da requisição
app.use(express.urlencoded({ extended: true }));

//aqui está sendo configurado o uso da biblioteca session
app.use(session({
    secret: 'unoeste', //chave para criptografia
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 2 // 2 minutos
    }
}));
// quando buscas /node_modules, ele vai buscar na pasta node_modules
app.use('/node_modules', express.static('./node_modules'));
app.use(express.static('./public'));

app.get('/', (requisicao, resposta) => {
    resposta.redirect('/eventos.html');
});

app.post('/evento', (requisicao, resposta) => {
    
    const id = requisicao.body.id;
    const nome = requisicao.body.nome;
    const cidade = requisicao.body.cidade;
    const endereco = requisicao.body.endereco;
    const data = requisicao.body.data;
    const descricao = requisicao.body.descricao;
    const valor = requisicao.body.valor;
    const quantidade = requisicao.body.quantidade;
    const status = 1;
    const evento = new Evento(id, nome, cidade, endereco, data, descricao, valor, quantidade, status);
    if(id)
        evento.alterar();
    else
        evento.incluir();
});

app.get('/deleteEvento/:id',async (requisicao, resposta) => {
    const id = requisicao.params.id;
    const evento = new Evento();
    evento.excluir(id);
    resposta.redirect('/evento-admin.html');
});

app.get('/evento/:id',async (requisicao, resposta) => {
    const id = requisicao.params.id;
    const evento = new Evento();
    const eventos = await evento.consultar(id);
    resposta.json(eventos);
});

app.get('/eventos', async  (requisicao, resposta) => {
    // Criando uma instância da classe Evento
    const evento = new Evento();

    // Chama o método consultar() da instância de Evento
    const eventos = await evento.consultar();

    // Envia a lista de eventos como resposta em formato JSON
    resposta.json(eventos);
});

app.post('/login', autenticar);

app.get('/sair', sair);

app.use(verificaSessao, express.static('./private'));


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

