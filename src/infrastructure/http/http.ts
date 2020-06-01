import express, { Request } from 'express';
import http from 'http';
import { CreateUserController } from 'Adapter/CreateUserController';
import { CreateUserRepo } from 'Infrastructure/DB/CreateUserRepo';
import { CreateUserUseCase } from 'Application/CreateUserUseCase';
import { User } from 'Domain/User';
import { ICreateUserDTO } from 'Application/ICreateUserDTO';

const app = express();

app.post('/user', (req: Request) => {
  const userData: ICreateUserDTO = req.body;
  const user = new User(userData);

  const userRepo = new CreateUserRepo(user);
  const createUserUseCase = new CreateUserUseCase(user, userRepo);
  const createUserController = new CreateUserController(createUserUseCase);

  createUserController.createUser();
});

const server = http.createServer(app);

server.listen(3000);
