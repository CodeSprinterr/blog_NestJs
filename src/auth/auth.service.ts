import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(name: string, email: string, password: string) {

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already registered'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ name, email, password: hashedPassword });

    const payload = { email: user.email, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }
}
