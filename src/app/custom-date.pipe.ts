import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, format: string = 'dd-MM-yyyy'): any {
    if (!value) return value;

    const datePipe = new DatePipe('en-US');
    let formattedDate = datePipe.transform(value, 'dd-MM-yyyy');

    // Custom implementation for 'dd-yy-MMM'
    if (format === 'dd-MM-yyyy') {
      const date = new Date(value);
      const day = ('0' + date.getDate()).slice(-2);
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear().toString().slice(-2);
      formattedDate = `${day}-${year}-${month}`;
    }

    return formattedDate;
  }

}
