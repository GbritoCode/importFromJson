const {Sequelize} = require('sequelize');
const Campanhas_Clientes = require('./Campanhas_Clientes');
const CliComp = require('./CliComp');
const CliCont = require('./CliCont');
// Imports here
const Cliente =require('./Cliente');
//...

const models = [
    // Models that I want to use
    Cliente,
    CliComp,
    Campanhas_Clientes,
    CliCont
    //...
];

class Database {
    constructor() {
        this.init();
    }
    // Load on database init
    init() {
        this.connection = new Sequelize({
            username: "postgres",
            password: "e98fee051278550ad4ba03ba3c9b86a228429c6c",
            database: "prospectar",
            host: "127.0.0.1",
            dialect: "postgres"
          });
        models.forEach(model => model.init(this.connection));
    }
}

module.exports =  new Database();