import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.userService.comparePassword(user, password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
      name: user.name,
    };
  }
}
