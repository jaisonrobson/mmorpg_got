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

JogoDAO.prototype.iniciaJogo = async function(res, usuario, casa, msg) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("jogo");

    const result = await myCollection.find({ usuario: usuario }).toArray();

    res.render('jogo', { img_casa: casa, jogo: result[0], msg: msg });
}

JogoDAO.prototype.acao = async function(acao) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("acao");

    var date = new Date();
    var tempo = null;

    switch(parseInt(acao.acao)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
    }

    acao.acao_termina_em = date.getTime() + tempo;

    const result = await myCollection.insertOne(acao);
}

JogoDAO.prototype.getAcoes = async function(usuario, res) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("acao");

    const result = await myCollection.find({ usuario: usuario }).toArray();

    res.render('pergaminhos', { acoes: result });
}


module.exports = function() {
    return JogoDAO;
}