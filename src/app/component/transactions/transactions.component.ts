import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {MatDialog} from "@angular/material/dialog";
import {TransactionFilterComponent} from "../dialog/transaction-filter/transaction-filter.component";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  transactionList:any = [];
  totalEarn: any = 0;
  totalExpense:any = 0;
  isFilter: boolean = false;
  constructor(
    private transactionService: TransactionService,
    private commonService: CommonService, public dialog: MatDialog) { }

  ngOnDestroy(): void {
    }

  ngOnInit(): void {
    this.getTransactionData();
  }
  getTransactionData() {
    this.transactionService.transactions.subscribe((response:any)=>{
      this.generateTransactions(response);
    })

    this.generateTransactions(this.transactionService.getAllTransactions());
  }

  generateTransactions(list:any) {
    this.transactionList = list.sort((a:any, b:any)=> b.d - a.d);
    this.totalExpense = 0;
    this.totalEarn = 0;
    this.transactionList.forEach((t:any)=>{
      t.c = t.c.replace(/>/g,' : ')
      if (t.ft == 'Earn') {
        this.totalEarn += t.a;
      }
      if (t.ft == 'Expense') {
        this.totalExpense += t.a;
      }
    })
  }

  openTransactionFilter() {
    this.dialog.open(TransactionFilterComponent).afterClosed().subscribe((filterData:any)=>{
      // console.log(filterData)
      if (filterData) {
        this.isFilter = true;
        this.totalExpense = 0;
        this.totalEarn = 0;
        this.transactionList = this.commonService.getTransactionList().sort((a:any, b:any)=> b.d - a.d).filter((tran:any)=>{
          return (filterData) && (
            ((filterData.ft && tran.ft == filterData.ft) || filterData.ft == null) &&
            ((filterData.c && filterData.c == tran.c) || filterData.c == null) &&
            ((filterData.u && filterData.u == tran.u) || filterData.u == null) &&
            ((filterData.sd && filterData.sd <= tran.d) || filterData.sd == null) &&
            ((filterData.ed && filterData.ed >= tran.d) || filterData.ed == null)
          );
        })
        this.transactionList.forEach((t:any)=>{
          t.c = t.c.replace(/>/g,' : ')
          if (t.ft == 'Earn') {
            this.totalEarn += t.a;
          }
          if (t.ft == 'Expense') {
            this.totalExpense += t.a;
          }
        })
      }
    });
  }

  clearFilter() {
    this.getTransactionData();
    this.isFilter=false;
  }
}
