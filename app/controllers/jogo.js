module.exports.jogo = function(application, req, res){

    if (req.session.autorizado !== true) {
        res.send('Usuario nao esta logado.');

        return;        
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa);
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err) {
        res.render('index', { validacao: {} });
    });
}