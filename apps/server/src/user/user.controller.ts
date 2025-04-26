import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody } from '@nestjs/swagger';
import { SubmitFormDto } from './dto/submit-form.dto';
import { AuthGuard } from '@nestjs/passport';
import { DocumentDto } from './dto/documents.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: SubmitFormDto })
  @Patch('/submit-form')
  @UseGuards(AuthGuard('jwt'))
  async saveUserDetails(
    @Body() userDetails: SubmitFormDto,
    @CurrentUser() currentUser: any,
  ) {
    return await this.userService.saveUserDetails({
      user_id: currentUser?._id,
      userDetails: userDetails,
    });
  }

  @ApiBody({ type: DocumentDto })
  @Patch('/upload-doc')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'abn_file' },
      { name: 'license' },
      { name: 'insurance_certificate' },
    ]),
  )
  @UseGuards(AuthGuard('jwt'))
  async uploadDocuments(
    @UploadedFiles()
    files: {
      abn_file?: Express.Multer.File[];
      license?: Express.Multer.File[];
      insurance_certificate?: Express.Multer.File[];
    },
    @CurrentUser() user: any,
  ) {
    return this.userService.uploadDocuments({
      abn_file: files?.abn_file?.[0] ?? null,
      license: files?.license?.[0] ?? null,
      insurance_certificate: files?.insurance_certificate?.[0] ?? null,
      userid: user._id,
    });
  }

  @Patch('/upload-signature')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'signature' }]))
  @UseGuards(AuthGuard('jwt'))
  async uploadSignature(
    @UploadedFiles()
    files: { signature: Express.Multer.File[] },
    @CurrentUser() user: any,
  ) {
    return this.userService.uploadSignature({
      signature: files.signature[0],
      userid: user._id,
      useremail: user.email,
    });
  }

  @Get('/driver-details')
  @UseGuards(AuthGuard('jwt'))
  async getDriverDetails(@CurrentUser() currentUser: any) {
    return await this.userService.getUserDetails({ userid: currentUser?._id });
  }
}
