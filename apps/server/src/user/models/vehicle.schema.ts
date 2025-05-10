import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  number: string;

  @Prop()
  model: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  license_type: string;
}

export const VehicleDetailsSchema = SchemaFactory.createForClass(Vehicle);
