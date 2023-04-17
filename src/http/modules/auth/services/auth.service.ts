import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRepository } from '../../user/repositories/user-repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.getUser(email);

    if (!user) {
      throw new Error('Email/password are incorrect');
    }

    const checkPassword = await bcrypt.compare(pass, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createRedeemPasswordLink(email: string) {
    const user = await this.userRepository.getUser(email);

    if (!user) {
      throw new Error('Email/password are incorrect');
    }

    function generateToken({
      stringBase = 'base64',
      byteLength = 48,
    } = {}): Promise<string> {
      return new Promise((resolve, reject) => {
        randomBytes(byteLength, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer.toString('base64url'));
          }
        });
      });
    }

    const token = await generateToken();

    const hashedToken = await this.jwtService.signAsync({ token });

    await this.userRepository.setRecoverPasswordToken(token, user.email);

    return `http://localhost:3000/users/recoverPassword/${hashedToken}`; //should be sent to user email (but for this challenge will be returned call)
  }

  async changePasswordRequest(token: string, password: string): Promise<void> {
    try {
      const decodedToken = (await this.jwtService.verifyAsync(token)) as {
        token: string;
      };
      await this.userRepository.alterUserPassword(decodedToken.token, password);
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
