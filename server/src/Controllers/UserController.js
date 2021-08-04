// -- Controller Usuário -- //
import * as Yup from 'yup';
import User from '../Models/User'; // Importa usuário para manpulação.

class UserController {
	async store(req, res) {
		// - Validações -- //
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			email: Yup.string().email().required(),
			username: Yup.string().required(),
			password: Yup.string().required(),
			access_level: Yup.number().required(),
		});

		// -- Captura os dados enviados -- //
		const {
			nome, email, username, password, access_level,
		} = req.body;

		// -- Verifica permissão do usuário -- //
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Dados não conferem!' });
		}
		const user = await User.create({
			nome,
			email,
			username,
			password,
			access_level,
		});

		return res.json(user);
	}

	async index(req, res) {
		// const { user_id } = req.header;

		const users = await User.find();

		return res.json(users);
	}

	async update(req, res) {
		// -- Validação dos dados -- //
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			email: Yup.string().email().required(),
			username: Yup.string().required(),
			password: Yup.string().required(),
			access_level: Yup.number().required(),
		});
		// -- Declarações -- //
		const { nome, email, username, password, access_level } = req.body;
		const { user_id } = req.params;
		const { _id } = req.headers;

		// -- Verifica dados -- //
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Falha na validação!' });
		}
		// -- Busca Informações do usuário -- //
		const users = await User.findById(user_id);
		const veruser = await User.find({ _id: _id });
		const usrmap = veruser.map((item) => {
			return item.access_level;
		});

		if (usrmap[0] == 1) {
			// -- Atualiza usuário -- //
			await User.updateOne(
				{ _id: user_id },
				{
					nome: nome,
					email: email,
					username: username,
					password: password,
					access_level: access_level,

				}
			);
			return res.json({ Message: "Usuário alterado com Sucesso!" });
		}
		else if (usrmap[0] == 2) {
			return res.json({ Message: "Usuário sem permissão!" });
		}
		return res.json({ Message: "Erro, usuário não encontrado!" });
	}

	async destroy(req, res) {
		const { _id } = req.query;

		const armusr = await User.findById({ _id });
		console.log(armusr);
		await User.findByIdAndDelete({ _id });

		const user = await User.findById({ _id });

		if (user === null) {
			return res.json({ Message: 'Usuário Excluído' });
		}
		return res.json({ Message: 'Erro ao excluir usuário!' });
	}
}

export default new UserController();
