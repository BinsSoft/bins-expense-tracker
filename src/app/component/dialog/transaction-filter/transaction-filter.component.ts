import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {CategoryActionComponent} from "../category-action/category-action.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private commonService: CommonService, private dialog: MatDialog, private fb: FormBuilder, public dialogRef: MatDialogRef<TransactionFilterComponent>) {
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

    this.categoryList = this.commonService.categoryInit();
    this.users = this.commonService.getUsersList();
  }
  selectCategory() {
    this.dialog.open(CategoryActionComponent, {
      width: '80%'
    }).afterClosed().subscribe((result:any)=>{
      if (result) {
        this.searchForm.value.c = result;
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
