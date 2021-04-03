import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], phrase: string): any[] {
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = ('' + phrase).toLowerCase();
    return value.filter(item => {
      const strItem: string = ('' + item.title).toLowerCase();
      const strItem2: string = ('' + item.description).toLowerCase();
      return strItem.includes(phrase) || strItem2.includes(phrase);
    });

  }
}