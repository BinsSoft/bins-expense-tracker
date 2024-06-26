import { Pipe, PipeTransform } from '@angular/core';
import {TransactionService} from "../service/transaction.service";

@Pipe({
  name: 'cateoryFlag'
})
export class CateoryFlagPipe implements PipeTransform {

  constructor(private transactionService: TransactionService) {
  }
  transform(value: any, ...args: any[]): unknown {
    if (args.length > 0  && Array.isArray(args[0]) ) {
      value = value.toString();
      if (value.indexOf(',') > -1) {
        return args[0].filter((c: any) => value.split(",").indexOf(c.id.toString()) > -1).map((c: any) => c.name).join(" ");
      }
    }
    return value;
  }

}
