function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = async function (usuario) {

    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("usuarios");

    const result = await myCollection.insertOne(usuario);

    console.log(`Documento inserido ${result}`);
}

module.exports = function() {
    return UsuariosDAO;
}