import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './tokenPayloadInterface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  
  async createUser(c:CreateUserDto) {
    try{return await this.userService.createUser(c)} 
    catch(e) {
      console.log(e)
      throw new HttpException("xxx", HttpStatus.NOT_FOUND)
    }
  }
  
  async loginUser(l:LoginUserDto) {
    try{
      const user = await this.userService.findUserByEmail(l.email)
      const ispsMatched = await user.checkPassword(l.password)
      if(!ispsMatched) throw new HttpException('pw not matched', HttpStatus.BAD_REQUEST)
      return user

    } catch(e) {
      console.log(e)
    throw new HttpException('xxxxxx', HttpStatus.NOT_FOUND)}
  }


public generateAccessToken(userId:string) {
  const payload : TokenPayloadInterface = {userId} 
  const token = this.jwtService.sign(payload, {


    secret : this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    expiresIn : this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),

  })
}

}
