import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // @Имя фильтра
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  // @Описание настроек
  // value | то что стоит перед прямой чертой
  //другие переменные вызываються через : 'locate' и тд
  transform(value: any, locale?: any, format?: any): any {
    let date = new Date( value.seconds);
    let result;

    switch (format) {
      case 'full':
        result = date.toLocaleString(locale, {
          weekday: 'long',
          month: 'long',
          year: 'numeric'
        });
        break;
      case 'short':
        result = date.toLocaleString(locale, {
          weekday: 'short',
          month: 'short',
          year: 'numeric'
        });
      default:
        result = date.toLocaleString(locale);
        break;
    }

    return result;
  }
}
