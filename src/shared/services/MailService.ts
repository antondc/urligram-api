import nodemailer, { Transporter } from 'nodemailer';

/*
Sends email through nodemailer lib.
Requirements:
- Set the password in .env file
- Use TLS port 465.
- TLS is a requirement for platforms as AWS
*/

interface ConnectionOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class MailService {
  transporter: Transporter;

  constructor(connectionOptions: ConnectionOptions) {
    this.transporter = nodemailer.createTransport({
      host: connectionOptions.host,
      port: connectionOptions.port,
      auth: {
        user: connectionOptions.user,
        pass: connectionOptions.pass,
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3',
      },
      secure: true,
    });
  }

  sendMail(mailOptions: MailOptions): Promise<{ success: boolean; payload: unknown }> {
    return this.transporter
      .sendMail(mailOptions)
      .then((payload) => {
        return {
          success: true,
          payload,
        };
      })
      .catch((payload) => {
        console.log('---------------');
        console.log('Email error: ', payload);
        console.log('---------------');

        return { success: false, payload };
      });
  }
}
