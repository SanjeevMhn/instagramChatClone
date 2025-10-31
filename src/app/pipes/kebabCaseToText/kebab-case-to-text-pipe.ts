import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCaseToText'
})
export class KebabCaseToTextPipe implements PipeTransform {

  transform(value: string): string{
    return value.toLowerCase().replace('-', ' & ');
  }

}
