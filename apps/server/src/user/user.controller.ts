import {
  Body,
  Controller,
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
import { User } from './models/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: SubmitFormDto })
  @Post('/submit-form')
  @UseGuards(AuthGuard('jwt'))
  async saveUserDetails(@Body() userDetails: SubmitFormDto) {
    return await this.userService.saveUserDetails(userDetails);
  }

  @ApiBody({ type: DocumentDto })
  @Post('/upload-doc')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'abn_file' }, { name: 'license' }]),
  )
  @UseGuards(AuthGuard('jwt'))
  async uploadDocuments(
    @UploadedFiles()
    files: { abn_file: Express.Multer.File[]; license: Express.Multer.File[] },
    @CurrentUser() user: any,
  ) {
    console.log(user);
    return this.userService.uploadDocuments({
      abn_file: files.abn_file[0],
      license: files.abn_file[0],
      userid: user.id,
    });
  }
}
