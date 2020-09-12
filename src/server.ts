import 'reflect-metadata';
import express from 'express';
import { createConnection, getRepository, Repository } from 'typeorm';
import User from './entities/User';

let userRepository: Repository<User>;

createConnection()
  .then(() => {
    userRepository = getRepository(User);

    console.log('banco conectado baby');
  })
  .catch(erro => console.log(erro))

const app = express();
const port = 3333;

// registrar usuários
app.post('/', async (req, res) => {

  // pegamos o nome e a localização
  const { name, latitude, longitude } = req.body;

  // criamos uma instância de usuário
  const user = await userRepository.query(
    'INSERT INTO users (name, location)' +
    'VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326));',
    [name, longitude, latitude]
  )

  return res.json({ message: 'Usuário registrado!', user });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}... 🚀`);
});