import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionsSubject:Subject<any> = new Subject<any>();
  transactions: Observable<any> = this.transactionsSubject.asObservable();
  transactionSha: string = '';
  configSha: string = '';


  usersSubject:Subject<any> = new Subject<any>();
  users: Observable<any> = this.usersSubject.asObservable();



  categorySubject:Subject<any> = new Subject<any>();
  category: Observable<any> = this.categorySubject.asObservable();

  transactionList: any =[];
  userList: any = [];
  categoryList:any = [];
  constructor(private restService:RestService, private _snackBar: MatSnackBar) { }

  fetch() {
    const mobileNo: any = window.localStorage.getItem('_user');
    if (mobileNo) {
      this.restService.getContent(mobileNo+'/transactions.json').subscribe((response:any)=>{
        this.transactionSha = response.sha;

        this.transactionList = JSON.parse(atob(response.content));
        this.emitAllTransactions();
      });
      // this.restService.getContent(mobileNo+'/config.json').subscribe((response:any)=>{
      //   this.configSha = response.sha;
      //   const config:any = JSON.parse(atob(response.content));
      //   this.userList = config.users;
      //   this.categoryList = config.category;
      //   this.getAllCategory();
      //   this.getAllUsers();
      //   setTimeout(()=>{
      //
      //   }, 1000)
      // });
    }
  }
  emitAllTransactions() {
    this.transactionsSubject.next(this.getAllTransactions());
  }
  getAllTransactions() {
    // this.transactionList = [];
    let transactionList: any = this.transactionList;
    transactionList = transactionList.concat(this.getLocalData('_t'));
    return transactionList;
  }
  getLocalData(key:any) {
    const value:any = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  }
  updateTransactions() {
    const transactions = this.getAllTransactions();
    if (this.getLocalData('_t').length >0) {
      const mobileNo: any = window.localStorage.getItem('_user');
      this.restService.update(mobileNo + '/transactions.json', 'Update Transactions of ' + mobileNo, transactions, this.transactionSha).subscribe((response: any) => {
        window.localStorage.setItem('_t', JSON.stringify([]));
        this._snackBar.open("Synced Successful", "",{
          duration: 2000,
          horizontalPosition:'center',
          verticalPosition:"top"
        })
      });
    }
  }
  deleteTransactions(transactionItem: any) {
    let localData: any = this.getLocalData('_t');
    let index = null;
    let isDelete = false;
    if (localData.length >0) {
      index = localData.findIndex((t:any)=>t.i == transactionItem.i);
      if (index > -1) {
        localData.splice(index,1);
        window.localStorage.setItem('_t', JSON.stringify(localData));
        isDelete = true;
      }
    }
    if (!isDelete) {
      const transactions = this.getAllTransactions();
      index = transactions.findIndex((t:any)=>t.i == transactionItem.i);
      transactions.splice(index,1);
      const mobileNo: any = window.localStorage.getItem('_user');
      this.restService.update(mobileNo + '/transactions.json', 'Delete Transactions of ' + mobileNo, transactions, this.transactionSha).subscribe((response: any) => {
        window.localStorage.setItem('_t', JSON.stringify([]));
      });
    }


  }

  editTransactions(transactionItem: any) {
    let localData: any = this.getLocalData('_t');
    let index = null;
    let isEdit = false;
    if (localData.length >0) {
      index = localData.findIndex((t:any)=>t.i == transactionItem.i);
      if (index > -1) {
        localData[index] = transactionItem;
        window.localStorage.setItem('_t', JSON.stringify(localData));
        isEdit = true;
      }
    }
    if (!isEdit) {
      const transactions = this.getAllTransactions();
      index = transactions.findIndex((t:any)=>t.i == transactionItem.i);
      transactions[index] = transactionItem;
      const mobileNo: any = window.localStorage.getItem('_user');
      this.restService.update(mobileNo + '/transactions.json', 'Delete Transactions of ' + mobileNo, transactions, this.transactionSha).subscribe((response: any) => {
        window.localStorage.setItem('_t', JSON.stringify([]));
      });
    }


  }

  getAllCategory() {
    let categoryList: any = this.categoryList;
    // categoryList = categoryList.concat(this.getLocalData('_c'));
    this.categorySubject.next(categoryList);
    return categoryList;
  }
  getAllUsers() {
    let userList: any = this.userList;
    // userList = userList.concat(this.getLocalData('_u'));
    this.usersSubject.next(userList);
    return userList;
  }

  updateConfig() {
    const body: any = {
      users: this.getAllUsers(),
      category: this.getAllCategory()
    }
    const mobileNo: any = window.localStorage.getItem('_user');
    this.restService.update(mobileNo + '/config.json', 'Update Config of ' + mobileNo, body, this.configSha).subscribe((response: any) => {
      this.configSha = response.content.sha;
    });
  }
}
