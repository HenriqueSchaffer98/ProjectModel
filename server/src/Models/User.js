// -- Manipulação do Usuário -- //
import { Schema, model } from 'mongoose';

// -- Criação da estrutura do usuário -- //
const UserSchema = new Schema({
  nome: String,
  email: String,
  username: String,
  password: String,
  access_level: Number,
});
export default model('User', UserSchema);
