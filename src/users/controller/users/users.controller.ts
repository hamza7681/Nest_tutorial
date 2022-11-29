import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        username: 'Hamza',
        posts: {
          id: 1,
          title: 'post',
        },
      },
    ];
  }
  //   One way to make post request
  @Post()
  createUsers(@Req() req: Request, @Res() res: Response) {
    const data = req.body;
    res.json(data);
  }

  //   otherway to post request is to use @Body decorator
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) createUser: CreateUserDTO) {
    return createUser;
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    if (id !== 1) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  getUsersList(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return sortBy;
  }
}
