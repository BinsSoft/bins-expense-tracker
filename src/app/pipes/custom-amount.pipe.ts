import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customAmount'
})
export class CustomAmountPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    let text = value;
    let transactionItem: any = args[0];
    if (transactionItem) {
      text = text.replace(transactionItem.a.toString() , '<span class="'+(transactionItem.t == 1? "credit": "debit")+'">'+transactionItem.a+'</span>')
      // text = text.replace(transactionItem.a.toString() , '')
    }
    return text;
  }

}
