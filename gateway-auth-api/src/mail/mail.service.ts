import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { StringService } from "src/util/util.service";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  transporter: nodemailer.Transporter;
  realTransporter: nodemailer.Transporter;

  constructor(
    private readonly stringService: StringService,
    private readonly configService: ConfigService,
  ) {
    this.logger.log(nodemailer);
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: configService.get("SMTP_USER"),
        pass: configService.get("SMTP_PASSWORD"),
      },
    });

    this.realTransporter = nodemailer.createTransport({
      host: "stevenctemp.com",
      port: 465,
      auth: {
        user: configService.get("SMTP_REAL_USER"),
        pass: configService.get("SMTP_REAL_PASSWORD"),
      },
    });
  }

  async sendResetEmail(email: string, token: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get("SMTP_REAL_USER"),
      to: email,
      subject: this.stringService.mail.SUBJECT,
      text: this.stringService.mail.TEXT(token),
      html: this.stringService.mail.HTML(token),
    };
    // Ethereal Email: Catch all, for our test users with fake emails
    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(info.response);
    } catch (err) {
      this.logger.error(err.message);
    }
    // Legit Email: Need actual email for this one to work
    try {
      const info = await this.realTransporter.sendMail(mailOptions);
      this.logger.log(info.response);
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
