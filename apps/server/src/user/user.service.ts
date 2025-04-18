import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.schema';
import { Model } from 'mongoose';
import { RegiterDto } from '../auth/dto/register-user.dto';
import { UniqueCheckInterface } from 'src/shared/interfaces/unique-check.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessages } from 'src/shared/constants/message.constant';
import { SubmitFormDto } from './dto/submit-form.dto';

@Injectable()
export class UserService implements UniqueCheckInterface<string> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async findUniqueByField(field: string, value: string): Promise<boolean> {
    const user = await this.userModel.findOne({ [field]: value });
    return !user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async register(body: RegiterDto) {
    const hashedPassword = await this.hashPassword(body.password);
    const response = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    const payload = { id: response?.id ?? '', email: response?.email ?? '' };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      success: true,
      message: ResponseMessages.REGISTER_SUCCESS,
    };
  }

  async login(body: RegiterDto) {
    const hashedPassword = await this.hashPassword(body.password);
    const response = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    const payload = { id: response?.id, email: response?.email };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      success: true,
      message: ResponseMessages.REGISTER_SUCCESS,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException([ResponseMessages.USER_NOT_FOUND]);
    }
    return user;
  }

  async saveUserDetails(userDetails: SubmitFormDto) {
    const response = await this.userModel.create(userDetails)
    return response
  }
}
