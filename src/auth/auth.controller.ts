import {
  Controller,
  Get,
  Post,
  Res,
  Render,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // auth pages///////////////////

  @Get('/login')
  @Render('auth/login')
  loginPage() {
    return {
      title: 'login',
    };
  }

  @Get('/register')
  @Render('auth/register')
  registerPage(@Res() res: any) {
    const user = res.user as any;

    if (user) return res.redirect('/chatroom');

    return {
      title: 'register',
    };
  }
  //////////////////////////////

  //action/////////////////////
  @Post('/login')
  @UseGuards(LoginGuard)
  login(@Res() res: Response) {
    return res.redirect('/chatroom');
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getUser(@Req() req: any) {
    const user = req.user;
    return {
      user,
    };
  }
  ////////////////////////////
}
