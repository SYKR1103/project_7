import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createUser(@Body() c:CreateUserDto) {
    return this.authService.createUser(c)
  }

  @Post("/login")
  async loginUser(@Body() l:LoginUserDto) {
    const user =  await this.authService.loginUser(l)
    const token = await this.authService.generateAccessToken(user.id)
    return token
  }




}
