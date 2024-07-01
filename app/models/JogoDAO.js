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
    const acaoCollection = myDB.collection("acao");

    var date = new Date();
    var tempo = null;

    switch(parseInt(acao.acao)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
    }

    acao.acao_termina_em = date.getTime() + tempo;

    await acaoCollection.insertOne(acao);

    const jogoCollection = myDB.collection("jogo");

    var moedas = 0;
    switch(parseInt(acao.acao)) {
        case 1: moedas = -2 * acao.quantidade; break;
        case 2: moedas = -3 * acao.quantidade; break;
        case 3: moedas = -1 * acao.quantidade; break;
        case 4: moedas = -1 * acao.quantidade; break;
    }

    const result = await jogoCollection.updateOne(
        { usuario: acao.usuario },
        { $inc: { moeda: moedas } }
    );
}

JogoDAO.prototype.getAcoes = async function(usuario, res) {
    const myDB = this._connection.db("got");
    const myCollection = myDB.collection("acao");

    var date = new Date();
    var momento_atual = date.getTime();

    const result = await myCollection.find({ usuario: usuario, acao_termina_em: { $gt:momento_atual } }).toArray();

    res.render('pergaminhos', { acoes: result });
}


module.exports = function() {
    return JogoDAO;
}