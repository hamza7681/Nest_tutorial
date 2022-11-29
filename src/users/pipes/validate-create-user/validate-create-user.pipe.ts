import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    const parseAgetoInt = parseInt(value.age.toString());
    if (isNaN(parseAgetoInt)) {
      console.log('Age is not a number');
    }
    return { ...value, age: parseAgetoInt };
  }
}
