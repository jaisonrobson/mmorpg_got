module.exports.jogo = function(application, req, res){

    if (req.session.autorizado !== true) {
        res.send('Usuario nao esta logado.');

        return;        
    }

    var msg = '';

    if (req.query.msg != '')
        msg = req.query.msg;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err) {
        res.render('index', { validacao: {} });
    });
}

module.exports.suditos = function(application, req, res){
    if (req.session.autorizado !== true) {
        res.send('Usuario nao esta logado.');

        return;
    }

    res.render('aldeoes', { validacao: {} });
}

module.exports.pergaminhos = function(application, req, res){
    if (req.session.autorizado !== true) {
        res.send('Usuario nao esta logado.');

        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.getAcoes(req.session.usuario, res);
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    if (req.session.autorizado !== true) {
        res.send('Usuario nao esta logado.');

        return;
    }
    
    var dadosForm = req.body;

    req.assert('acao', 'Acao deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A');

        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}