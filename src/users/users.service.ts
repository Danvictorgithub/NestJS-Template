import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    createUserDto.username = createUserDto.username.toLowerCase();
    const userExist = await this.prisma.user.findUnique({ where: { username: createUserDto.username } });
    if (userExist) {
      throw new BadRequestException("User Already Exist");
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY || '5'));
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
