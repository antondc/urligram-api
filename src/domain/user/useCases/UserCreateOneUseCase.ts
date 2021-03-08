import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserCreateOneRequest } from '@domain/user/useCases/interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from '@domain/user/useCases/interfaces/IUserCreateOneResponse';
import { MailService } from '@infrastructure/services/MailService';
import { ENDPOINT_CLIENTS } from '@shared/constants/env';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';

export interface IUserCreateOneUseCase {
  execute: (userCreateOneRequest: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
}

export class UserCreateOneUseCase implements IUserCreateOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userCreateOneRequest: IUserCreateOneRequest): Promise<IUserCreateOneResponse> {
    const { name, email, password, password_repeated } = userCreateOneRequest;

    if (!name) throw new UserError('User name incorrect', 409);

    if (password !== password_repeated) throw new UserError('Passwords are not equal', 409);

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userAlreadyExists = await this.userRepo.userGetOne({ name, email });
    if (!!userAlreadyExists) throw new UserError('User already exist', 409);

    const { activationToken, ...response } = await this.userRepo.userCreateOne({ name, email, password });
    if (!response.id) throw new UserError('User creation failed', 409);

    const connectionOptions = { host: 'antoniodiaz-me.correoseguro.dinaserver.com', port: 587, user: 'hello@antoniodiaz.me', pass: 'G9khusC96RmK8fRm' };
    const emailService = new MailService(connectionOptions);
    const emailOptions = {
      from: 'hello@antoniodiaz.me',
      to: response?.email,
      subject: `Hello ${response?.name}`,
      text: `Welcome ${response?.name}! Click here to confirm your account: ${ENDPOINT_CLIENTS[0]}/confirm-account/${activationToken}`,
    };
    emailService.sendMail(emailOptions);

    return response;
  }
}
