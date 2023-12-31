import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../dialog/category-add/category-add.component";
import {CommonService} from "../../service/common.service";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  categoryList: any = [];
  constructor(public dialog: MatDialog, private commonService: CommonService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.category.subscribe((response: any)=>{
      this.categoryList = response;
    });
    this.categoryList = this.transactionService.getAllCategory();

  }
  addNewCategory() {
    this.dialog.open(CategoryAddComponent).afterClosed().subscribe((result:any)=>{
      if (result) {
        this.categoryList.push({
          id: this.categoryList.length +1,
          name: result.name,
          repeatDate : (result.isRepeat)? result.repeatDate : 0,
        });
        this.transactionService.categoryList = this.categoryList;
        this.transactionService.updateConfig();
      }
    });
  }
}
