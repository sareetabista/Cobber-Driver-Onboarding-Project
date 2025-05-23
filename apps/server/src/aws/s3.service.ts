import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'ap-southeast-2',
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY') as string,
        secretAccessKey: configService.get('AWS_SECRET_KEY') as string,
      },
    });
    // this.bucket = this.configService.get("AWS_S3_BUCKET_NAME")
    this.bucket = configService.get('BUCKET_NAME') as string;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));
    return `${key}`;
  }

  async deleteFile(key: string): Promise<void> {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,

      // ResponseContentType: 'application/octet-stream',
      // ContentType: "application/octet-stream"
    });

    try {
      return await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });
    } catch (error) {
      throw new Error(`Failed to generate signed url: ${error.message}`);
    }
  }
}
