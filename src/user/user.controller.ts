import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'list all users' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @Get(':id')
  @ApiOkResponse({ description: 'get user by id' })
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.user({ id: parseInt(id.toString()) });
  }

  @Post('create')
  @ApiOkResponse({ description: 'create new user' })
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'edit user by id' })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.updateUser({
      where: { id: parseInt(id.toString()) },
      data: updateUserDTO,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'delete user by id' })
  async deleteUserById(@Param('id') id: Number) {
    return this.userService.deleteUser({
      id: parseInt(id.toString()),
    });
  }
}
