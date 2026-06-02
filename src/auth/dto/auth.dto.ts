import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class SessionDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  userId: string;
}

export class UserDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerified: boolean;
}

export class SessionDto {
  @ApiProperty({ type: SessionDataDto })
  session: SessionDataDto;

  @ApiProperty({ type: UserDataDto })
  user: UserDataDto;
}
