import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserResponse, User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDto: any): Promise<CreateUserResponse> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;

    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();
    
    const { name, email, portfolio } = savedUser.toObject();

    return { name, email, portfolio };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async comparePassword(user: User, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, user.password);
  }


  async addToPortfolio(id: string, item: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $addToSet: { portfolio: item } },
      { new: true }
    ).exec();
  }

  async removeFromPortfolio(id: string, item: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $pull: { portfolio: item } },
      { new: true }
    ).exec();
  }

  async getPortfolio(id: string): Promise<string[]> {
    const user = await this.userModel.findById(id).select('portfolio').exec();
    return user?.portfolio || [];
  }
}
