import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthResponseDto,
  LoginDto,
  RegisterDto,
  SessionDto,
} from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  protected map: Record<string, number> = {
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    //   and more from BetterAuth
  };

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result: any = await this.authService.register(body);
    console.log(result);

    if (result?.error) {
      res.status(this.map[result.error.status] ?? 400);
      return result;
    }

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);
    return result.response;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result: any = await this.authService.login(body);
    console.log(result);

    if (result?.error) {
      res.status(this.map[result.error.status] ?? 400);
      return result;
    }

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);

    return result.response;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const headers = new Headers();
    const cookie = req.headers.cookie;
    if (cookie) headers.set('cookie', cookie);

    const result = await this.authService.logout(headers);
    console.log(result);

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);

    return result.response;
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current session' })
  @ApiResponse({ status: 200, type: SessionDto })
  async me(@Req() req: Request) {
    const headers = new Headers();
    const cookie = req.headers.cookie;
    if (cookie) headers.set('cookie', cookie);

    return await this.authService.getSession(headers);
  }
}
