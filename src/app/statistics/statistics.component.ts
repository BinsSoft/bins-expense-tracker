import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../service/transaction.service";
import {CommonService} from "../service/common.service";
import {TransactionFilterComponent} from "../component/dialog/transaction-filter/transaction-filter.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  transactionList:any = [];
  categoryList:any = [];
  totalAmount:any = 0;
  isFilter:boolean =false;
  constructor(private transactionService: TransactionService,
              private commonService: CommonService, public dialog: MatDialog) {
    this.transactionService.transactions.subscribe((transaction:any)=>{
      this.categoryList = this.transactionService.categoryList;
      this.generateTransactions(transaction);
    });
  }
  generateTransactions(list:any) {
    console.log(list)
    this.categoryList = this.transactionService.getAllCategory();
    this.totalAmount = 0;
    list.forEach((tran:any)=>{
      this.totalAmount  += tran.a;
      const comment:any = tran.c.toLowerCase().split(' ');
      let categoryIndex = this.categoryList.findIndex((i:any)=> this.haveCommonItems(comment, i.keywords));
      // console.log(comment, categoryIndex)
      if (tran.t == 1) {
        categoryIndex = this.categoryList.length-2;
      }else if (categoryIndex == -1) {
        categoryIndex = this.categoryList.length-1;
      }
      // console.log(categoryIndex)
      if (this.categoryList[categoryIndex]) {
        this.categoryList[categoryIndex].amount += Number(tran.a);
      }
    })
    this.categoryList = this.categoryList.map((category:any)=>{
      const p = (category.amount*100)/this.totalAmount;
      return {
        ...category,
        parcent: Number(p.toFixed(2))
      }
    }).sort((a:any, b:any)=> b.parcent - a.parcent);
    // console.log(this.categoryList, this.totalAmount, list);
  }
  openTransactionFilter() {
    this.dialog.open(TransactionFilterComponent, {
      autoFocus:false
    }).afterClosed().subscribe((filterData:any)=>{
      // console.log(filterData)
      if (filterData) {
        this.isFilter = true;
        const transactionList = this.transactionService.getAllTransactions().sort((a:any, b:any)=> b.d - a.d).filter((tran:any)=>{
          return (filterData) && (
            ((filterData.c && tran.c.toLowerCase().indexOf(filterData.c.toLowerCase())> -1) || filterData.c == null) &&
            ((filterData.sd && filterData.sd <= tran.d) || filterData.sd == null) &&
            ((filterData.ed && filterData.ed >= tran.d) || filterData.ed == null) &&
            ((filterData.t === tran.t) || filterData.t == null)
          );
        })
       this.generateTransactions(transactionList);
      }
    });
  }
  clearFilter() {
    this.generateTransactions(this.transactionService.getAllTransactions());
    this.isFilter=false;
  }
  syncData() {
    this.transactionService.updateTransactions();

  }
  haveCommonItems(arr1:any, arr2:any) {
    const set1 = new Set(arr1);

    const commonItems = arr2.filter((item:any) => set1.has(item.toLowerCase()));
    return commonItems.length > 0;
  }
  ngOnInit(): void {
    this.transactionService.emitAllTransactions();
  }

}
