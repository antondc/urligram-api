import { PasswordHasher, TokenJWT, validateEmailAddress, validateUserName } from '@antoniodcorrea/utils';
import { DEFAULT_USER_IMAGE } from '@domain/file/entities/constants';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserCreateOneRequest } from '@domain/user/useCases/interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from '@domain/user/useCases/interfaces/IUserCreateOneResponse';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, ENDPOINT_CLIENT } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { UserError } from '@shared/errors/UserError';
import { MailService } from '@shared/services/MailService';

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

    if (!name) throw new UserError('User name incorrect', 409, 'name');

    if (password !== password_repeated) throw new UserError('Passwords are not equal', 409, 'password');

    const nameIsValid = validateUserName(name);
    if (!nameIsValid) throw new UserError('User name invalid', 409, 'user name');

    const isEmail = validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409, 'email');

    const userAlreadyExists = await this.userRepo.userGetOne({ name, email });
    if (!!userAlreadyExists) throw new UserError('User already exist', 409, 'name');

    const tokenService = new TokenJWT(JWT_SECRET);
    const token = tokenService.createToken({ name });

    const passwordHasher = new PasswordHasher();
    const passwordBuffer = await passwordHasher.hashPassword(password);
    const hashedPassword = await passwordHasher.bufferToHash(passwordBuffer);

    const user = await this.userRepo.userCreateOne({ name, email, image: DEFAULT_USER_IMAGE, password: hashedPassword, token });
    if (!user.id) throw new UserError('User creation failed', 409);

    const connectionOptions = { host: EMAIL_HOST, port: EMAIL_PORT, user: EMAIL_USER, pass: EMAIL_PASSWORD };
    const emailService = new MailService(connectionOptions);
    const emailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Hello ${name}`,
      text: `Welcome ${name}! Click here to confirm your account: ${ENDPOINT_CLIENT}/sign-up-confirmation/check?name=${name}&token=${token}`,
    };
    const { success } = await emailService.sendMail(emailOptions);

    if (!success) {
      await this.userRepo.userCreateOneUndo({ userId: user.id });

      throw new UserError('Email incorrect', 409, 'email');
    }

    return user;
  }
}
