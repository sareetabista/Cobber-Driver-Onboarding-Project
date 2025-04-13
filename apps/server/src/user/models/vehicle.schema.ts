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
}

export const VehicleDetailsSchema = SchemaFactory.createForClass(Vehicle);
