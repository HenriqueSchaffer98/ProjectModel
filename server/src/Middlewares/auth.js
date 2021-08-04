import jwt from 'jsonwebtoken';
import authConfig from '../Config/auth.json';


const verifyJWT = (req, res, next) => {

	// ======== Verifica Token ======== //
	const token = req.headers['autorization'];

	if (!token) {
		return res.status(401).json({ auth: false, Message: "Nenhum token encontrado" });

	}
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) return res.status(401).json({ auth: false, Message: "Falha na autenticação do token..." });
		req.userId = decoded.id;
		return next();

	});
}
export default verifyJWT;
