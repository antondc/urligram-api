import express, { Request } from 'express';
import http from 'http';
import { CreateUserController } from 'Adapter/CreateUserController';
import { CreateUserRepo } from 'Infrastructure/DB/CreateUserRepo';
import { CreateUserUseCase } from 'Application/CreateUserUseCase';
import { ICreateUserDTO } from 'Application/ICreateUserDTO';

const app = express();

app.post('/user', (req: Request) => {
  const createUserDTO: ICreateUserDTO = req.body;

  const userRepo = new CreateUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserController = new CreateUserController(createUserUseCase, createUserDTO);

  createUserController.createUser();
});

const server = http.createServer(app);

server.listen(3000);
