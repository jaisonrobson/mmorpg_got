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


module.exports = function() {
    return JogoDAO;
}