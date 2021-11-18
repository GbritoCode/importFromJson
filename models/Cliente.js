const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require('axios');
const CliComp = require("./CliComp");

 class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        nomeAbv: DataTypes.STRING,
        rzSoc: DataTypes.STRING,
        fantasia: DataTypes.STRING,
        RepresentanteId: DataTypes.STRING,
        TipoComisseId: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        prospect: DataTypes.BOOLEAN,
        fone: DataTypes.STRING,
        site: DataTypes.STRING,
        atvPrincipal: DataTypes.STRING,
        erp: DataTypes.STRING,
        database: DataTypes.STRING,
        ramo: DataTypes.STRING,
        setor: DataTypes.STRING,
        qtdFuncionarios: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    this.addHook('afterCreate', async (cliente) => {
      await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cliente.CNPJ}`)
        .then(async (response) => {
          await CliComp.create({
            ClienteId: cliente.id,
            CondPgmtoId: 1,
            cep: response.data.cep,
            rua: response.data.logradouro,
            numero: response.data.numero,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            cidade: response.data.municipio,
            uf: response.data.uf,
            inscMun: 'Isento',
            inscEst: 'Isento',
          });
        }).catch((err) => {
          console.log(err);
          cliente.destroy();
          return Promise.reject(new Error('Número de requisições excedeu o tempo limite, cliente não criado, por favor aguarde um pouco e tente novamente'));
        });
    });
    return this;
  }
}
module.exports = Cliente;