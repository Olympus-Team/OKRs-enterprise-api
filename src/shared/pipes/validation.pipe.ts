import { Injectable, ArgumentMetadata, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly numberOfError: number = 0;
  private readonly emptyValue: number = 0;

  /* eslint  @typescript-eslint/explicit-module-boundary-types: "off" */
  public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST);
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > this.numberOfError) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private formatErrors(errors: any[]): string {
    return errors
      .map((err) => {
        for (const property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }

  private isEmpty(value: any): boolean {
    if (Object.keys(value).length > this.emptyValue) {
      return false;
    }
    return true;
  }
}
