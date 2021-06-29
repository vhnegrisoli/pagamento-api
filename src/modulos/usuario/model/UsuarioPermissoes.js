import Sequelize from "sequelize";

import sequelize from "../../../config/db/index";

import Usuario from "./Usuario";
import Permissao from "./Permissao";

const UsuarioPermissao = sequelize.define(
  "usuario_permissoes",
  {},
  { timestamps: false }
);
Usuario.belongsToMany(Permissao, { through: UsuarioPermissao });
Permissao.belongsToMany(Usuario, { through: UsuarioPermissao });

export default UsuarioPermissao;
