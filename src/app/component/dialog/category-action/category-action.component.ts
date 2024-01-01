import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {$e} from "@angular/compiler/src/chars";
import {MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../../service/transaction.service";

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.scss']
})
export class CategoryActionComponent implements OnInit {
  categoryList: any = [];
  constructor(private transactionService: TransactionService,public dialogRef: MatDialogRef<CategoryActionComponent>,private commonService: CommonService) { }

  ngOnInit(): void {
    this.categoryList = this.transactionService.getAllCategory();
  }

  onSelectAction($event: any) {
    this.dialogRef.close($event)
  }
}
