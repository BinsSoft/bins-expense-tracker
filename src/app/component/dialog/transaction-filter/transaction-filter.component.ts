import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {CategoryActionComponent} from "../category-action/category-action.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../../service/transaction.service";

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private transactionService: TransactionService,
    private commonService: CommonService, private dialog: MatDialog, private fb: FormBuilder, public dialogRef: MatDialogRef<TransactionFilterComponent>) {
    this.searchForm = this.fb.group({
      ft: [null],
      c: [null ],
      u: [null],
      sd:[],
      ed:[],
    })
  }

  financeType: any = [
    'Earn',
    'Expense'
  ]
  categoryList: any = [];
  users: any = [];
  ngOnInit(): void {
    this.categoryList = this.transactionService.getAllCategory();
    this.users = this.transactionService.getAllUsers();
  }

  displaySelectedCategory: string = '';
  selectCategory() {
    this.dialog.open(CategoryActionComponent, {
      width: '80%'
    }).afterClosed().subscribe((result:any)=>{
      if (result) {
        result.forEach((c:any)=>{
          this.displaySelectedCategory += c.name+" ";
        })
        this.searchForm.value.c = (result.map((c:any)=> c.id).toString());
      }
    });
  }

  filterAction() {
    if (this.searchForm.value.sd) {
      this.searchForm.value.sd = new Date(this.searchForm.value.sd.setHours(0,0,0,0)).getTime();
    }
    if (this.searchForm.value.ed) {
      this.searchForm.value.ed = new Date(this.searchForm.value.ed.setHours(23,59,59,0)).getTime();
    }
    this.dialogRef.close(this.searchForm.value);
  }
}
