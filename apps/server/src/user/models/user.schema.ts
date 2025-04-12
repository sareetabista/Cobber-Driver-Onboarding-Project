import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EMAIL_REGEX,
  FORM_STATUS,
  PHONE_REGEX,
  USER_ROLE,
} from 'src/common/constants/user.constants';

export class VehicleDetails {
  @Prop()
  name: string;

  @Prop()
  number: string;

  @Prop()
  model: string;
}

const VehicleDetailsSchema = SchemaFactory.createForClass(VehicleDetails);

@Schema({ timestamps: true })
export class User {
  @Prop({
    // required: true
  })
  fullname: string;

  @Prop({
    required: true,
    unique: true,
    match: EMAIL_REGEX,
  })
  email: string;

  @Prop({
    // required: true,
    unique: true,
    match: PHONE_REGEX,
  })
  phone: string;

  @Prop({ type: VehicleDetailsSchema })
  vehicleDetails: VehicleDetails;

  @Prop({ required: true, minlength: 8 })
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
  signatiure_time: string;

  @Prop({
    enum: [
      FORM_STATUS.NOT_STARTED,
      FORM_STATUS.INITIATED,
      FORM_STATUS.COMPLETED,
    ],
    default: 'not_started',
  })
  status: string;

  @Prop({
    enum: [USER_ROLE.SUPER_ADMIN, USER_ROLE.DRIVER],
    default: 'driver',
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
