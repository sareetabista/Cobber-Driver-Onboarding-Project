import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { IsUniquesConstraint } from 'src/shared/validators/is-unique.validator';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { AwsModule } from 'src/aws/aws.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    AwsModule,
    MailerModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    IsUniquesConstraint,
    {
      provide: 'UniqueCheckService',
      useExisting: UserService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
