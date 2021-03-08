import nodemailer, { Transporter } from 'nodemailer';

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
  text: string;
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
    });
  }

  sendMail(mailOptions: MailOptions) {
    this.transporter.sendMail(mailOptions);
  }
}
