import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseUUIDPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CustomRequest } from './custom-request.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put('portfolio/add')
  @UseGuards(JwtAuthGuard)
  async addToPortfolio(@Req() req: CustomRequest, @Body('item') item: string) {
    const userId = req.user._id;
    return this.userService.addToPortfolio(userId, item);
  }

  @Put('portfolio/remove')
  @UseGuards(JwtAuthGuard)
  async removeFromPortfolio(@Req() req: CustomRequest, @Body('item') item: string) {
    const userId = req.user._id;
    return this.userService.removeFromPortfolio(userId, item);
  }

  @Get('me/portfolio')
  @UseGuards(JwtAuthGuard)
  async getPortfolio(@Req() req: CustomRequest) {    
    const userId = req.user._id;
    return this.userService.getPortfolio(userId);
  }
}
