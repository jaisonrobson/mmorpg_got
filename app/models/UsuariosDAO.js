var crypto = require('crypto');

function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = async function (usuario) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("usuarios");

    var senha_cryptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");

    usuario.senha = senha_cryptografada;

    const result = await myCollection.insertOne(usuario);
}

UsuariosDAO.prototype.autenticar = async function(usuario, req, res) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("usuarios");

    var senha_cryptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");

    usuario.senha = senha_cryptografada;

    const result = await myCollection.find(usuario).toArray();

    if (result[0] != undefined) {
        req.session.autorizado = true;
        req.session.usuario = result[0].usuario;
        req.session.casa = result[0].casa;
    }

    if (req.session.autorizado) {
        res.redirect('jogo');
    }
    else
    {
        res.render('index', { validacao: {} });
    }
}

module.exports = function() {
    return UsuariosDAO;
}