function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = async function (usuario) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("jogo");

    const result = await myCollection.insertOne({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random()*1000),
        sabedoria: Math.floor(Math.random()*1000),
        comercio: Math.floor(Math.random()*1000),
        magia: Math.floor(Math.random()*1000)
    });
}

JogoDAO.prototype.iniciaJogo = async function(res, usuario, casa, comando_invalido) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("jogo");

    const result = await myCollection.find({ usuario: usuario }).toArray();

    res.render('jogo', { img_casa: casa, jogo: result[0], comando_invalido: comando_invalido });
}


module.exports = function() {
    return JogoDAO;
}