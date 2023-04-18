import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInRequestBody } from '../signInRequestBody';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInRequestBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const session = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      response.cookie('sessionToken', session.access_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
      });
      return { token: session.access_token, user: session.user };
    } catch (error) {
      return response.json(error);
    }
  }

  @Post('recoverPassword/')
  recoverPassword(@Body() data: { email: string }) {
    return this.authService.createRedeemPasswordLink(data.email);
  }

  @Put('recoverPassword/:token')
  setNewPassword(
    @Param() params: { token: string },
    @Body() data: { password: string },
  ) {
    return this.authService.changePasswordRequest(params.token, data.password);
  }

  @Get('tokenValidate/:token')
  checkIfTokenIsValid(@Param() params: { token: string }) {
    return this.authService.validateToken(params.token);
  }
}
