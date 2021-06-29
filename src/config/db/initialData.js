import bcrypt from "bcryptjs";
import Usuario from "../../modulos/usuario/model/Usuario";
import UsuarioPermissoes from "../../modulos/usuario/model/UsuarioPermissoes";
import Permissao from "../../modulos/usuario/model/Permissao";

export async function createInitialConfig() {
  await Usuario.sync({ force: true });
  await Permissao.sync({ force: true });
  await UsuarioPermissoes.sync({ force: true });
  await createInitialData();
}

async function createInitialData() {
  let savedPermission1 = await Permissao.create({
    descricao: "ADMIN",
  });

  let savedPermission2 = await Permissao.create({
    descricao: "CUSTOMER",
  });

  let senha = await bcrypt.hash("123456", 10);
  let savedUser = await Usuario.create({
    nome: "test_user",
    email: "test_user@gmail.com",
    senha: senha,
    data_cadastro: new Date().toISOString(),
  });

  await UsuarioPermissoes.bulkCreate([
    {
      usuarioId: savedUser.id,
      permissaoId: savedPermission2.id,
    },
    {
      usuarioId: savedUser.id,
      permissaoId: savedPermission1.id,
    },
  ]);
}
