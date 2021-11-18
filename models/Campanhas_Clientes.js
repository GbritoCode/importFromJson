const { Sequelize, Model, DataTypes } = require("sequelize");
 class Campanhas_Clientes extends Model {
  static init(sequelize) {
    super.init(
      {
        CampanhaId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        ativo: DataTypes.BOOLEAN,
        reuniaoAgend: DataTypes.DATEONLY,
        orcamentoSolict: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        efetivacao: DataTypes.DATEONLY,
        atraida: DataTypes.DATEONLY,
        status: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
module.exports = Campanhas_Clientes;