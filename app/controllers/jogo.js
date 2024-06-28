module.exports.jogo = function(application, req, res){

    if (req.session.autorizado) {
        res.render('jogo', { img_casa: req.session.casa });
    }
    else
    {
        res.send('Usuario nao esta logado.');
    }
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err) {
        res.render('index', { validacao: {} });
    });
}