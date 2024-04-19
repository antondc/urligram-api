import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, ENDPOINT_CLIENT } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';
import { MailService } from '@shared/services/MailService';
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

    const user = await this.userRepo.userGetOne({ adminRequest: true, name: nameOrEmail, email: nameOrEmail });
    if (!user) throw new AuthenticationError('User doesn’t exist', 404, 'nameOrEmail');

    const tokenService = new TokenJWT(JWT_SECRET);
    const token = tokenService.createToken({ name: user?.name });

    const userUpdated = await this.userRepo.userForgotPassword({ userId: user?.id, token });
    if (!userUpdated) throw new AuthenticationError('User doesn’t exist', 404, 'nameOrEmail');

    const userWithEmail = await this.userRepo.userGetCredentials({ userId: user?.id });
    if (!userWithEmail) throw new AuthenticationError('User doesn’t exist', 404);

    const connectionOptions = { host: EMAIL_HOST, port: EMAIL_PORT, user: EMAIL_USER, pass: EMAIL_PASSWORD };

    const emailService = new MailService(connectionOptions);
    const emailOptions = {
      from: EMAIL_USER,
      to: userWithEmail?.email,
      subject: `Reset password request — ${user?.name}`,
      html: `<html> <head> <meta charset="utf-8"/> <meta name="color-scheme" content="only"/> <meta name="x-apple-disable-message-reformatting"/> <title>Urligram - social bookmarking</title> <style>body{margin-right: 20px; margin-left: 20px;}.body{position: relative; font-size: 1.3em; margin-top: 30px; margin-right: auto; margin-bottom: 50px; margin-left: auto; width: 100%; max-width: 600px; padding: 20px 40px 40px; background-color: #fffffe; line-height: 27px; border: 8px solid #3182e1; font-family: sans-serif; font-weight: bold; color: #0d2540;}.header{font-weight: bold;}.footer{padding: 0px; margin-top: 50px;}.centered{text-align: center; width: 100%; margin: 30px auto 40px;}.button{text-align: center; padding: 10px 50px; margin: 0 auto; color: #3182e1; border: 4px solid #3182e1; text-decoration: none; text-transform: uppercase; font-size: 18px;}.link{text-decoration: none; color: #3182e1;}.link:visited{text-decoration: underline; color: #3182e1;}.link:hover{text-decoration: underline; color: #6da4e4; text-decoration: none; transition: color 0.15s ease;}.disabledLink{text-decoration: none; color: #0d2540; pointer-events: none;}.hr{border: 2px solid #3182e1; margin-bottom: 20px;}</style> </head> <body> <div class="body"> <p>Hi ${user?.name}!</p><div class="main"> <p> We received a request to reset the password related to the email <a class="disabledLink" href="mailto:${userWithEmail?.email}"> ${userWithEmail?.email}</a > . No changes were made to your account yet. </p><p>You can reset your password by clicking the link below:</p><p class="centered"> <a class="button" href="${ENDPOINT_CLIENT}/reset-password?name=${user?.name}&token=${token}" > Reset my password</a > </p><p> If you did not request this change please contact us by replying to this email. </p><p> You can find more answers in the <a class="link" href="${ENDPOINT_CLIENT}/en/docs"> documentation</a > page, and you can contact us for any question you may have. </p></div><div class="footer"> <hr class="hr"/> The Urligram team<br/> <a class="link" href="mailto:hello@urligram.com">hello@urligram.com</a><br/> </div></div></body></html>`,
    };

    const { success } = await emailService.sendMail(emailOptions);
    if (!success) throw new UserError('Email incorrect', 409, 'email');

    const sessionLogData = {
      result: 'success',
      type: 'reset account',
      userId: user?.id,
    };

    await this.userRepo.userLogSession(sessionLogData);

    return { success: true };
  }
}
