const UserService = require('./users');
const userService = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodeMailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user._previousDataValues.password);
    if (!isMatch) throw boom.unauthorized();
    return user;
  }
  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }
  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const payload = {
      sub:user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await userService.update(user.id, {
      recoveryToken: token,
    });
    const mail = {
      from:  config.email, // sender address
      to: config.email, // list of receivers
      subject: "Email to recovery your password", // Subject line
      html: `<b>Click the following link => ${link}</b>`, // html body
    }
    return await this.sendMail(mail);
  }
  async sendMail(infoMail) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail Sent!' };
  }
}

module.exports = AuthService;
