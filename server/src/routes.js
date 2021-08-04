// -- Packages -- //
import { Router } from 'express';
import UserController from './Controllers/UserController';
import SessionController from './Controllers/SessionController';
import verifyJWT from './Middlewares/auth'; // -- Middleware autenticação
// -- Controllers -- //

// -- Criação das Rotas -- //
const routes = new Router();
// ======== Controle de Sessão ========= //
// -- POST -- //
routes.post('/login', SessionController.store);
// -- GET -- //
routes.get('/teste', verifyJWT, SessionController.index);

// ======== Controle de usuário ========= //
// -- Rotas GET -- //
routes.get('/users', verifyJWT, UserController.index);
// -- Rotas POST -- //
routes.post('/createuser', UserController.store); // Rota para criar usuários;
// -- Rotas Delete -- //
routes.delete('/users/delete', UserController.destroy);
// -- Rotas PUT -- //
routes.put('/updtusr/:user_id', UserController.update);

export default routes;
