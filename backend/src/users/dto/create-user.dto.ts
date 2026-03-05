import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class ValidateEmailDto {
  @IsEmail({}, { message: 'Введите корректный e-mail адрес' })
  @IsNotEmpty({ message: 'E-mail обязателен для заполнения' })
  email: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный e-mail адрес' })
  @IsNotEmpty({ message: 'E-mail обязателен для заполнения' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @Matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
    message: 'Пароль должен содержать только латинские символы',
  })
  password: string;
}
