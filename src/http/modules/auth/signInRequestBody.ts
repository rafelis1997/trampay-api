import { IsNotEmpty } from 'class-validator';

export class SignInRequestBody {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
