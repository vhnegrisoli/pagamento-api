import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Usuario from "../model/Usuario";
import Permissao from "../model/Permissao";
import * as auth from "../../../config/auth/apiKey";

class UsuarioController {
  async findAllPermissoes(req, res) {
    try {
      const permissoes = await Permissao.findAll({ include: Usuario });
      return res.json(permissoes);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findAll(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        include: Permissao,
        required: true,
        as: "permissoes",
      });
      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findOne({
        where: {
          id,
        },
      });
      if (usuario) {
        let p = await usuario.getPermissaos();
        return res.json({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          permissoes: p,
        });
      }
      return res.status(400).json({ message: "Usuário não encontrado" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getToken(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "É obrigatório informar usuário e senha" });
      }
      const usuario = await Usuario.findOne({
        where: { email },
      });
      if (!usuario) {
        return res
          .status(400)
          .json({ message: "O email " + email + " não foi encontrado." });
      }
      if (await bcrypt.compare(senha, usuario.senha)) {
        let permissoes = await usuario
          .getPermissaos()
          .map((permissao) => permissao.descricao);
        const usuarioAutenticado = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          permissoes,
        };
        const token = jwt.sign({ usuarioAutenticado }, auth.key, {
          expiresIn: "1d",
        });
        return res.json({ access_token: token });
      }
      return res.status(403).json({ message: "Usuário ou senha inválidos." });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UsuarioController();
