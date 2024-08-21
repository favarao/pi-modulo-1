import express from 'express';
import session from 'express-session';
import { autenticar, verificaSessao, sair } from './seguranca/autenticar.js';


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

app.post('/login', autenticar);

app.get('/sair', sair);

app.use(verificaSessao, express.static('./private'));


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

