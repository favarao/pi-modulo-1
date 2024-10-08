export function autenticar(requisicao, resposta){
    const usuario = requisicao.body.usuario;
    const senha   = requisicao.body.senha;
    if (usuario == 'joao' && senha == 'fipp') {
        requisicao.session.autenticado = true;
        const paginaOriginal = requisicao.session.paginaOriginal || '/';
        delete requisicao.session.paginaOriginal; // Limpa a URL original após o redirecionamento
        resposta.redirect(paginaOriginal);
        // resposta.redirect('/eventos.html');
        
    }
    else
    {
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<title>Falha no login</title>');
        resposta.write('<meta charset="utf-8">');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<p>Usuário ou senha inválidos</p>');
        resposta.write('<a href="/login.html">Voltar para tela de login</a>');
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
}

export function verificaSessao(requisicao, resposta, next){
    if (requisicao.session.autenticado){
        next();
    } else {
        requisicao.session.paginaOriginal = requisicao.originalUrl;
        resposta.redirect('/login.html');
    }
}

export function sair(requisicao, resposta){
    requisicao.session.destroy();
    resposta.redirect('/login.html');
}
