import Sequelize from "sequelize";

import sequelize from "../../../config/db/index";

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    senha: {
      type: Sequelize.STRING,
    },
    data_cadastro: {
      type: Sequelize.STRING,
    },
  },
  {
    // options
  }
);

export default Usuario;
