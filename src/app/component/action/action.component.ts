import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../service/common.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  actionForm: FormGroup;
  transactionList: any = [];

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder, private commonService: CommonService, private dialog: MatDialog, private router:Router) {
    this.actionForm = this.fb.group({
      ft: [null, [Validators.required]],
      c: [null, [Validators.required]],
      u: [null],
      a: [null, [Validators.required]],
      d:[new Date(), [Validators.required]],
      cm:['']
    })
  }

  financeType: any = [
    'Earn',
    'Expense'
  ]

  categoryList: any = [];
  users: any = [];
  showUser: boolean = false;
  ngOnInit(): void {

    // this.categoryList = this.transactionService.getAllCategory();
    this.transactionList = this.transactionService.getAllTransactions();
    this.users = this.transactionService.getAllUsers();
  }

  displaySelectedCategory: string = '';


  saveTransaction() {
    this.actionForm.value.d = this.actionForm.value.d.getTime();
    const transactions = this.commonService.getTransactionList();
    transactions.push(this.actionForm.value);
    this.commonService.setTransaction(transactions);
    this.router.navigate(['/transactions'])
  }
}
