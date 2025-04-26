import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EMAIL_REGEX,
  FORM_STATUS,
  PHONE_REGEX,
  USER_ROLE,
} from 'src/shared/constants/user.constants';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  fullname: string;

  @Prop({
    required: true,
    unique: true,
    match: EMAIL_REGEX,
  })
  email: string;

  @Prop({
    unique: true,
    sparse: true,
    match: PHONE_REGEX,
  })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Vehicle' })
  vehicleDetails: Types.ObjectId;

  @Prop({ required: true, minlength: 8, select: false })
  password: string;

  @Prop()
  abn_number: string;

  @Prop()
  license: string;

  @Prop()
  abn_file: string;

  @Prop()
  signature: string;

  @Prop()
  signature_time: string;

  @Prop({
    enum: [
      FORM_STATUS.NOT_STARTED,
      FORM_STATUS.INITIATED,
      FORM_STATUS.COMPLETED,
    ],
    default: FORM_STATUS.NOT_STARTED,
  })
  status: string;

  @Prop({
    enum: [USER_ROLE.SUPER_ADMIN, USER_ROLE.DRIVER],
    default: USER_ROLE.DRIVER,
  })
  role: string;

  @Prop({
    default: 0,
  })
  reminder_mail_count: number;

  @Prop({
    default: false,
  })
  completed_mail_sent: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
