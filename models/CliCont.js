const { Sequelize, Model, DataTypes } = require("sequelize");
 class CliCont extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        cel: DataTypes.STRING,
        fone: DataTypes.STRING,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        aniver: DataTypes.DATE,
        linkedin: DataTypes.STRING,
        cargo: DataTypes.STRING,
        ramal: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
module.exports = CliCont;