// -- Packages -- //
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// -- Features -- //
import routes from './routes';
import authMiddleware from './Middlewares/auth';

class App {
  constructor() {
    this.server = express();

    mongoose.connect('mongodb://localhost:27017/SWENG', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
      console.log('====== CONEXÃO ESTABELECIDA COM SUCESSO! ======');
    });
    mongoose.connection.on('error', (err) => {
      console.log(`====== OCORREU UM ERRO! ======${err}`);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('====== CONEXÃO FINALIZADA! ======');
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
		//this.server.use(authMiddleware);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
