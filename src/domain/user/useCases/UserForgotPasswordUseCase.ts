import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, ENDPOINT_CLIENTS } from '@shared/constants/env';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';
import { MailService } from '@shared/services/MailService';
import { TokenService } from '@shared/services/TokenService';
import { IUserForgotPasswordRequest } from './interfaces/IUserForgotPasswordRequest';
import { IUserForgotPasswordResponse } from './interfaces/IUserForgotPasswordResponse';

export interface IUserForgotPasswordUseCase {
  execute: (userLogin: IUserForgotPasswordRequest) => Promise<IUserForgotPasswordResponse>;
}

export class UserForgotPasswordUseCase implements IUserForgotPasswordUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLogin: IUserForgotPasswordRequest): Promise<IUserForgotPasswordResponse> {
    const { nameOrEmail } = userLogin;

    console.log('--------------------------------------------------------');
    console.log('IUserForgotPasswordUseCase: ');
    console.log('nameOrEmail: ', nameOrEmail);

    const user = await this.userRepo.userGetOne({ name: nameOrEmail, email: nameOrEmail });
    if (!user) throw new AuthenticationError('User doesn’t exist', 404, 'nameOrEmail');

    console.log('user?.id: ', user?.id);

    const tokenService = new TokenService();
    const token = tokenService.createToken({ name: user?.name });

    console.log('token: ', token);

    const response = await this.userRepo.userForgotPassword({ userId: user?.id, token });
    console.log('response: ', response);

    if (!response) throw new AuthenticationError('User doesn’t exist', 404, 'nameOrEmail');

    const connectionOptions = { host: EMAIL_HOST, port: EMAIL_PORT, user: EMAIL_USER, pass: EMAIL_PASSWORD };
    console.log('connectionOptions: ', connectionOptions);

    const emailService = new MailService(connectionOptions);
    const emailOptions = {
      from: EMAIL_USER,
      to: user?.email,
      subject: `Reset password request — ${user?.name}`,
      text: `Hi ${user?.name}! We received a request to reset your password. Please click here to reset your password: ${ENDPOINT_CLIENTS[0]}/reset-password?name=${user?.name}&token=${token}`,
    };

    const { success } = await emailService.sendMail(emailOptions);

    console.log('success mailService: ', success);

    if (!success) throw new UserError('Email incorrect', 409, 'email');
    console.log('success: ', success);

    const sessionLogData = {
      result: 'success',
      type: 'reset account',
      userId: user?.id,
    };

    await this.userRepo.userLogSession(sessionLogData);

    console.log('sessionLogData: ', sessionLogData);
    console.log('--------------------------------------------------------');

    return { success: true };
  }
}
