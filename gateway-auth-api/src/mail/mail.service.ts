import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  transporter: nodemailer.Transporter;

  constructor() {
    this.logger.log(nodemailer);
    this.transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      auth: {
        user: "project.1",
        pass: "secret.1",
      },
    });
  }

  async sendResetEmail(email: string, token: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "narrativenexus@noreply.com",
      to: email,
      subject: "Password reset",
      text: `Click this link to reset your password: http://localhost:3000/api/v1/auth/reset?token=${token}`,
      html: `<p>Click this link to reset your password: <a href='http://localhost:3000/api/v1/auth/reset?token=${token}'>Link</a></p>`,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(info.response);
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
