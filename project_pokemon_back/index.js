const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { ObjectId, MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());
app.use(cors());

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = "mongodb+srv://" + username + ":" + password + "@clusterpokemon.zrgt8yi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const db = client.db('pokemonProj');

async function novoUsuario(nick, senha, emblema, res){
  const usuarios = await db.collection('usuarios').find();
  let erro = false;
  const novoUsuario = {nick: nick, senha: senha, emblema: emblema, alimentos: 0, trofeus: 0, sequencia: 0, melhorSequencia: 0};
  for await(let usuarioExistente of usuarios){
    if(usuarioExistente.nick === nick){
      erro = true;
    }
  }
  const usuariosAdicionar = db.collection('usuarios')
  if(erro === false){
    await usuariosAdicionar.insertOne(novoUsuario);
    res.json("Sucesso! Usuário cadastrado!");
  }
  else{
    res.json("ERRO");
  }
  
}

async function pegaTodosUsuarios(res){
  const usuarios = await db.collection('usuarios').find();
  let usuariosRes = [];
  for await(let usuario of usuarios){
    usuariosRes.push(usuario);
  }
  res.json(usuariosRes);
}

async function usuarioLogado(nick, senha, res){
  const usuarios = await db.collection('usuarios').find();
  let usuario = undefined;
  for await(let usuarioExistente of usuarios){
    if(usuarioExistente.nick === nick && usuarioExistente.senha === senha){
      usuario = usuarioExistente;
    }
  }
  if(usuario !== undefined){
    res.json(usuario);
  }
  else{
    res.json("ERRO");
  }
}

async function atualizaUsuario(_id, nick, senha, emblema, alimentos, trofeus, sequencia, melhorSequencia){
  const usuarios = db.collection('usuarios');
  const filtro = { _id: new ObjectId(_id) };
  const atualiza = { "$set": {nick: nick, senha: senha, emblema: emblema, alimentos: alimentos, trofeus: trofeus, sequencia: sequencia, melhorSequencia: melhorSequencia}};
  await usuarios.updateOne(filtro, atualiza);
}

async function pegaTodosPokemons(res){
  const pokemons = await db.collection('pokemon').find();
  let pokemonsRes = [];
  for await (let pokemon of pokemons){
    pokemonsRes.push(pokemon);
  }
  res.json(pokemonsRes);
}

async function alimentaPokemon(_id, nome, alimentos){
  const pokemon = await db.collection('pokemon').findOne({nome: nome});
  const pokemonAlimentos = pokemon.alimentos + alimentos;
  const pokemons = db.collection('pokemon');
  const filtro = { _id: new ObjectId(_id) };
  const alimenta = { "$set": {nome: nome, alimentos: pokemonAlimentos}};
  await pokemons.updateOne(filtro, alimenta);
}

app.post('/usuarios/cadastro', (req, res) => {
  const {nick, senha, emblema} = req.body;
  novoUsuario(nick, senha, emblema, res);
})

app.get('/usuarios', (req, res) => {
  pegaTodosUsuarios(res);
})

app.post('/usuarios', (req, res) => {
  const {nick, senha} = req.body;
  usuarioLogado(nick, senha, res);
})

app.put('/usuarios', (req, res) => {
  const {_id, nick, senha, emblema, alimentos, trofeus, sequencia, melhorSequencia} = req.body;
  atualizaUsuario(_id, nick, senha, emblema, alimentos, trofeus, sequencia, melhorSequencia);
  res.json("Usuário Atualizado");
})

app.get('/pokemon', (req, res) => {
  pegaTodosPokemons(res);
})

app.put('/pokemon', (req, res) => {
  const {_id, nome, alimentos} = req.body;
  alimentaPokemon(_id, nome, alimentos);
  res.json(nome + " ganhou " + alimentos + " alimentos");
})

app.listen(3001, () => {
  console.log("Servidor online na porta 3001");
})
