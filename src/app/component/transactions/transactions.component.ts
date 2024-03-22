import {Component,  OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {MatDialog} from "@angular/material/dialog";
import {TransactionFilterComponent} from "../dialog/transaction-filter/transaction-filter.component";
import {TransactionService} from "../../service/transaction.service";
import {Observable} from "rxjs";
import {CategoryActionComponent} from "../dialog/category-action/category-action.component";
import {SpeekToTransactionComponent} from "../dialog/speek-to-transaction/speek-to-transaction.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  transactionList:any = [];
  totalEarn: any = 0;
  totalExpense:any = 0;
  totalBalance:any = 0;
  isFilter: boolean = false;
  categoryList: any =[];
  userList:any = [];
  showCredit: boolean = false;
  showBalance: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private transactionService: TransactionService,
    private commonService: CommonService, public dialog: MatDialog) {

    this.transactionService.transactions.subscribe((transaction:any)=>{
      this.generateTransactions(transaction);
    });
    this.transactionService.category.subscribe((category:any)=>{
      this.categoryList = category;
    });
    this.transactionService.users.subscribe((users:any)=>{
      this.userList = users;
    })
  }

  ngOnDestroy(): void {
    }

  ngOnInit(): void {
    this.transactionService.emitAllTransactions();
  }

  generateTransactions(list:any) {
    this.transactionList = list.sort((a:any, b:any)=> b.d - a.d);
    this.totalExpense = this.transactionList.filter((t:any)=> t.t == 0).map((t:any)=>t.a).reduce((a:any, b:any) => a + b, 0);
    this.totalEarn  = this.transactionList.filter((t:any)=> t.t == 1).map((t:any)=>t.a).reduce((a:any, b:any) => a + b, 0);

    this.totalBalance = this.totalEarn - this.totalExpense;

    // console.log(this.transactionList);
  }

  openTransactionFilter() {
    this.dialog.open(TransactionFilterComponent).afterClosed().subscribe((filterData:any)=>{
      // console.log(filterData)
      if (filterData) {
        this.isFilter = true;
        this.totalExpense = 0;
        this.totalEarn = 0;
        this.transactionList = this.transactionService.getAllTransactions().sort((a:any, b:any)=> b.d - a.d).filter((tran:any)=>{
          return (filterData) && (
            ((filterData.c && tran.c.toLowerCase().indexOf(filterData.c.toLowerCase())> -1) || filterData.c == null) &&
            ((filterData.sd && filterData.sd <= tran.d) || filterData.sd == null) &&
            ((filterData.ed && filterData.ed >= tran.d) || filterData.ed == null)
          );
        })
        this.totalExpense = this.transactionList.filter((t:any)=> t.t == 0).map((t:any)=>t.a).reduce((a:any, b:any) => a + b, 0);
        this.totalEarn  = this.transactionList.filter((t:any)=> t.t == 1).map((t:any)=>t.a).reduce((a:any, b:any) => a + b, 0);

        this.totalBalance = this.totalEarn - this.totalExpense;
      }
    });
  }

  clearFilter() {
    this.generateTransactions(this.transactionService.getAllTransactions());
    this.isFilter=false;
  }
  speechToText() {
    this.dialog.open(SpeekToTransactionComponent, {
      width: '80%'
    }).afterClosed().subscribe((result:any)=>{

    });
  }

  makeTransaction(transactionType: number) {
    this.dialog.open(SpeekToTransactionComponent, {
      width: '80%',
      data: {
        newId: this.transactionList.length+1,
        type: transactionType
      }
    }).afterClosed().subscribe((result:any)=>{
      this.transactionService.emitAllTransactions();
    });
  }

  deleteTransaction(transactionItem: any, index: number) {
    this._snackBar.open("Want to delete?", "Yes",{
      duration: 2000,
      horizontalPosition:'center',
      verticalPosition:"top"
    }).afterDismissed().subscribe((response:any)=>{
      if (response.dismissedByAction) {
        let index = this.transactionList.findIndex((t:any)=>t.i == transactionItem.i);
        this.transactionList.splice(index,1);
        this.transactionList = [... this.transactionList];
        this.transactionService.deleteTransactions(transactionItem);
        this.transactionService.emitAllTransactions();
      }
    });
  }

  editTransaction(transactionItem: any, index: number) {
    this.dialog.open(SpeekToTransactionComponent, {
      width: '80%',
      data: {
        item: transactionItem
      }
    }).afterClosed().subscribe((result:any)=>{
      this.transactionService.emitAllTransactions();
    });
  }
}
