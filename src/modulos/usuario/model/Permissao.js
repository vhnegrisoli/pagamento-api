import Sequelize from "sequelize";

import sequelize from "../../../config/db/index";

const Permissao = sequelize.define(
  "permissao",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

export default Permissao;
