import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async validateUser(email: string, password: string): Promise<any> {
    // Temporary hardcoded test credentials
    // TODO: Replace with real database lookup
    if (email === 'admin@ashtalents.com' && password === 'admin123') {
      return {
        id: 1,
        username: 'admin',
        email: 'admin@ashtalents.com',
        role: 'admin'
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.generateToken(payload),
    };
  }
}
