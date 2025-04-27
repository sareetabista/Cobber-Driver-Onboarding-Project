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
import { FORM_STATUS } from 'src/shared/constants/user.constants';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UserService implements UniqueCheckInterface<string> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private s3Service: S3Service,
    private mailerService: MailerService,
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

    const { password, ...rest } = response.toObject();

    this.mailerService.sendMail({
      subject: 'Welcome to Cobber',
      html: `
            <h1>Hi, Welcome to Cobber</h1>
            <p>We are thrilled to have you on board.</p>

            <p>Complete the onboarding form to start driving with us. </p>
            `,
      to: [rest.email],
    });

    return {
      access_token: this.jwtService.sign(
        { user: rest },
        {
          expiresIn: '7d',
        },
      ),
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
      message: ResponseMessages.LOGIN_SUCCESS,
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
        status: FORM_STATUS.INITIATED,
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
    insurance_certificate,
    userid,
  }: {
    abn_file: Express.Multer.File | null;
    license: Express.Multer.File | null;
    insurance_certificate: Express.Multer.File | null;
    userid: string;
  }) {
    const [abnResponse, licenseResponse, insuranceCertificateResponse] =
      await Promise.all([
        abn_file ? this.s3Service.uploadFile(abn_file) : Promise.resolve(null),
        license ? this.s3Service.uploadFile(license) : Promise.resolve(null),
        insurance_certificate
          ? this.s3Service.uploadFile(insurance_certificate)
          : Promise.resolve(null),
      ]);

    const updateData: Record<string, any> = {};

    if (abnResponse) updateData.abn_file = abnResponse;
    if (licenseResponse) updateData.license = licenseResponse;
    if (insuranceCertificateResponse)
      updateData.insurance_certificate = insuranceCertificateResponse;

    if (Object.keys(updateData).length > 0) {
      await this.userModel.findByIdAndUpdate(userid, {
        $set: updateData,
      });
    }

    return {
      message: 'Files Uploaded Successfully',
    };
  }

  async uploadSignature({
    signature,
    userid,
    useremail,
  }: {
    signature: Express.Multer.File;
    userid: string;
    useremail: string;
  }) {
    const [signatureUrl] = await Promise.all([
      this.s3Service.uploadFile(signature),
    ]);

    this.mailerService.sendMail({
      html: 'Thank you for choosing Cobber, you have completed the onboarding form. You will be contacted very soon',
      subject: 'Thank You',
      to: [useremail],
    });

    await this.userModel.findByIdAndUpdate(userid, {
      $set: {
        status: FORM_STATUS.COMPLETED,
        signature: signatureUrl,
        signature_time: new Date().toISOString(),
        completed_mail_sent: true,
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

    if (serializedUser?.insurance_certificate) {
      const signedInsuranceCertificate = await this.s3Service.getSignedUrl(
        serializedUser?.insurance_certificate,
      );
      serializedUser.insurance_certificate = signedInsuranceCertificate;
    }

    if (serializedUser?.signature) {
      const signedSignature = await this.s3Service.getSignedUrl(
        serializedUser?.signature,
      );
      serializedUser.signature = signedSignature;
    }

    return serializedUser;
  }

  async getUsersForEmail() {
    const users = await this.userModel
      .find({
        reminder_mail_count: { $lt: 3 },
        status: { $in: [FORM_STATUS.INITIATED, FORM_STATUS.NOT_STARTED] },
      })
      .exec();
    return users;
  }
}
