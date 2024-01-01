import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable, Subject} from "rxjs";

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
  constructor(private restService:RestService) { }

  fetch() {
    const mobileNo: any = window.sessionStorage.getItem('_user');
    if (mobileNo) {
      this.restService.getContent(mobileNo+'/transactions.json').subscribe((response:any)=>{
        this.transactionSha = response.sha;

        this.transactionList = JSON.parse(atob(response.content));
        this.getAllTransactions();
        setTimeout(()=>{
          this.restService.getContent(mobileNo+'/config.json').subscribe((response:any)=>{
            this.configSha = response.sha;
            const config:any = JSON.parse(atob(response.content));
            this.userList = config.users;
            this.categoryList = config.category;
            this.getAllCategory();
            this.getAllUsers();
          });
        }, 1000)

      });
    }
  }
  getAllTransactions() {
    let transactionList: any = this.transactionList;
    transactionList = transactionList.concat(this.getLocalData('_t'));
    this.transactionsSubject.next(transactionList);
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
      const mobileNo: any = window.sessionStorage.getItem('_user');
      this.restService.update(mobileNo + '/transactions.json', 'Update Transactions of ' + mobileNo, transactions, this.transactionSha).subscribe((response: any) => {
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
    const mobileNo: any = window.sessionStorage.getItem('_user');
    this.restService.update(mobileNo + '/config.json', 'Update Config of ' + mobileNo, body, this.configSha).subscribe((response: any) => {

    });
  }
}
