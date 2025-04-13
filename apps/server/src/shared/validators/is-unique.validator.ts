import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UniqueCheckInterface } from '../interfaces/unique-check.interface';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniquesConstraint<T> implements ValidatorConstraintInterface {
  constructor(
    @Inject('UniqueCheckService')
    private readonly uniqueCheckService: UniqueCheckInterface<T>,
  ) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const [field] = validationArguments?.constraints ?? [];
    return this.uniqueCheckService.findUniqueByField(field, value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} already exists`;
  }
}
