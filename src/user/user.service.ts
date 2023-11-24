import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    return newuser
  }

  async findUserById(id:string) {
    const user = await this.userRepo.findOneBy({id})
    if (user) return user
    throw new HttpException("ssss", HttpStatus.NOT_FOUND)
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({email})
    if (user) return user
    throw new HttpException("ssss", HttpStatus.NOT_FOUND)
  }


}
