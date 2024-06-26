import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  categoryList: any = [];
  constructor() { }

  categoryInit() {
    this.categoryList = this.getCategoryList();
    this.setCategoryList(this.categoryList);
    return this.categoryList;
  }
  getCategoryList() {
    this.categoryList = this.appendCategory('Bill Pay', this.categoryList);
    this.categoryList = this.appendCategory('Recharge', this.categoryList);
    if (window.localStorage.getItem('_c')) {
      const categoryText:any = window.localStorage.getItem('_c');
      this.categoryList = JSON.parse( categoryText );
    }
    return this.categoryList;
  }
  appendCategory(name: string, parent: any) {
    parent.push({
      id: parent.length+1,
      name: name,
    });
    return parent;
  }
  setCategoryList(category:any) {
    window.localStorage.setItem('_c', JSON.stringify(category));
  }

  getTransactionList() {
    const transactions:any = window.localStorage.getItem('_t');
    if (transactions) {
      return JSON.parse(transactions);
    }
    return [];
  }
  setTransaction(transactions:any) {
    window.localStorage.setItem('_t', JSON.stringify(transactions));
  }

  getUsersList() {
    const users:any = window.localStorage.getItem('_u');
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }
  setUsers(users:any) {
    window.localStorage.setItem('_u', JSON.stringify(users));
  }

  setMaxTransactionItem(totalItem:any) {
    window.localStorage.setItem('_m_t', totalItem);
  }
  getmaxTransactionItem() {
    return Number(window.localStorage.getItem('_m_t'));
  }


}
