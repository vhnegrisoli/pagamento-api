import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Usuario from '../model/Usuario';
import * as auth from '../../../config/auth/apiKey';

class UsuarioController {
  async findAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
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
        return res.json(usuario);
      }
      return res.status(400).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getToken(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: 'É obrigatório informar usuário e senha' });
      }
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ message: 'O email ' + email + ' não foi encontrado.' });
      }
      if (await bcrypt.compare(senha, usuario.senha)) {
        const usuarioAutenticado = { id: usuario.id, nome: usuario.nome, email: usuario.email };
        const token = jwt.sign({ usuarioAutenticado }, auth.key, {
          expiresIn: '1d',
        });
        return res.json(token);
      }
      return res.status(403).json({ message: 'Usuário ou senha inválidos.' });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UsuarioController();
