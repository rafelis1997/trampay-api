import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInRequestBody } from '../signInRequestBody';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInRequestBody) {
    return this.authService.signIn(signInDto.email, signInDto.password);
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
}
