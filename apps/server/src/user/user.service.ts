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
import { S3Service } from 'src/aws/s3.service';

@Injectable()
export class UserService implements UniqueCheckInterface<string> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private s3Service: S3Service,
  ) {}

  async findUniqueByField(field: string, value: string): Promise<boolean> {
    const user = await this.userModel.findOne({ [field]: value });
    return !user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
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
    const payload = { user: body };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      success: true,
      message: ResponseMessages.REGISTER_SUCCESS,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password');
    if (!user) {
      throw new NotFoundException([ResponseMessages.USER_NOT_FOUND]);
    }
    return user;
  }

  async saveUserDetails({
    userDetails,
    user_id,
  }: {
    userDetails: SubmitFormDto;
    user_id: string;
  }) {
    const response = await this.userModel.findByIdAndUpdate(user_id, {
      $set: {
        ...userDetails,
        vehicleDetails: {
          name: userDetails?.vehicleDetails?.name,
          model: userDetails?.vehicleDetails?.model,
          number: userDetails?.vehicleDetails?.number,
        },
      },
    });
    return response;
  }

  async uploadDocuments({
    abn_file,
    license,
    userid,
  }: {
    abn_file: Express.Multer.File;
    license: Express.Multer.File;
    userid: string;
  }) {
    const [abnResponse, licenseResponse] = await Promise.all([
      this.s3Service.uploadFile(abn_file),
      this.s3Service.uploadFile(license),
    ]);

    await this.userModel.findByIdAndUpdate(userid, {
      $set: {
        abn_file: abnResponse,
        license: licenseResponse,
      },
    });

    return {
      message: 'Files Uploaded Successfully',
    };
  }

  async uploadSignature({
    signature,
    userid,
  }: {
    signature: Express.Multer.File;
    userid: string;
  }) {
    const [signatureUrl] = await Promise.all([
      this.s3Service.uploadFile(signature),
    ]);

    await this.userModel.findByIdAndUpdate(userid, {
      $set: {
        signature: signatureUrl,
        signature_time: new Date().toISOString(),
      },
    });

    return {
      message: 'Signature Uploaded Successfully',
    };
  }

  async getUserDetails({ userid }: { userid: string }) {
    const user = await this.userModel.findById(userid);
    let serializedUser = user?.toObject();

    if (serializedUser?.abn_file) {
      const signedAbnFile = await this.s3Service.getSignedUrl(
        serializedUser?.abn_file,
      );
      serializedUser.abn_file = signedAbnFile;
    }

    if (serializedUser?.license) {
      const signedLicense = await this.s3Service.getSignedUrl(
        serializedUser?.license,
      );
      serializedUser.license = signedLicense;
    }

    if (serializedUser?.signature) {
      const signedSignature = await this.s3Service.getSignedUrl(
        serializedUser?.signature,
      );
      serializedUser.signature = signedSignature;
    }

    return serializedUser;
  }
}
