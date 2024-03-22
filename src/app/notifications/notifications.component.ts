import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../service/transaction.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpeekToTransactionComponent} from "../component/dialog/speek-to-transaction/speek-to-transaction.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  transactionList:any = [];
  constructor(private transactionService: TransactionService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.transactionService.transactions.subscribe((transaction:any)=>{
      this.generateTransactions(transaction);
    });
  }

  generateTransactions(list:any) {
    const rawList = list;
    this.transactionList = list.sort((a:any, b:any)=> b.d - a.d).filter((i:any)=>i.f == true)
      .map((item:any)=>{
        return {
          ...item,
          status: (rawList.filter((i:any)=> i.r_i == item.i && new Date(i.d).getMonth() == new Date().getMonth()).length>0 )? '':'PENDING'
        }
      });
  }
  transactionAction(type:string, transactionItem:any, index:number) {
    if (type == 'remove') {
      this._snackBar.open("Want to remove from the list?", "Yes",{
        duration: 2000,
        horizontalPosition:'center',
        verticalPosition:"top"
      }).afterDismissed().subscribe((response:any)=> {
        if (response.dismissedByAction) {
          transactionItem.f = false;
          this.transactionService.editTransactions(transactionItem);
          this.transactionService.emitAllTransactions();
          this._snackBar.open("Transaction is removed !!", "", {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: "top"
          })
        }
      });
    }
    else if (type =='re-pay') {
      this.dialog.open(SpeekToTransactionComponent, {
        width: '80%',
        data: {
          newId: this.transactionList.length+1,
          type: transactionItem.type,
          c: transactionItem.c,
          r_i: transactionItem.i
        }
      }).afterClosed().subscribe((result:any)=>{
        this.transactionService.emitAllTransactions();
      });
    }
  }

  ngOnInit(): void {
    this.transactionService.emitAllTransactions();

  }

}
