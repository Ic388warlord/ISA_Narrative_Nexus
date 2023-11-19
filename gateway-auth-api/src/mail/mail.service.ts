import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { StringService } from "src/util/util.service";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  transporter: nodemailer.Transporter;

  constructor( private readonly stringService: StringService) {
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
      from: this.stringService.mail.FROM_EMAIL,
      to: email,
      subject: this.stringService.mail.SUBJECT,
      text: this.stringService.mail.TEXT(token),
      html: this.stringService.mail.HTML(token),
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(info.response);
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
