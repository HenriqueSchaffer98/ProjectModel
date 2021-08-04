// -- Controller Sessão -- //
import * as Yup from 'yup';
import User from '../Models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../Config/auth.json';

class SessionController {
	async store(req, res) {


		// -- Validações -- //
		const schema = await Yup.object().shape({
			username: Yup.string().required(),
			password: Yup.string().required(),
		});

		// -- Captura dados enviados -- //
		const { username, password } = req.body;
		//const secretpasswd = 'S&fengterm!@';
		// -- Verificação dos dados do usuário //
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Falha na validação!' });
		}

		// -- Verifica se usuário existe
		const user = await User.find({
			username: username,
			password: password,
		});

		if (user.length === 0) {
			return res.status(401).json({ Message: 'Usuário ou  senha não conferem!' });
		}
		const usrmap = user.map((item) => {
			return item._id;
		});
		const token = jwt.sign({ userId: usrmap[0] }, authConfig.secret, { expiresIn: 86400 });
		return res.json({ auth: true, token });

	}
	async index(req, res){
		return res.json({ ok: true});
	}
}

export default new SessionController();
