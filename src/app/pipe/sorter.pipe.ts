import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], key: string): any[] {

    if (!Array.isArray(value) || key === '') {
      return value;
    }

    return value.sort(function (a, b): number {
      let keyA = a[key];
      let keyB = b[key];
      if (typeof keyA === 'number' && typeof keyB === 'number') {
        return keyA - keyB;
      } else {
        keyA = ('' + keyA).toLowerCase();
        keyB = ('' + keyB).toLowerCase();
        return keyA.localeCompare(keyB);
      }
    });

  }
}