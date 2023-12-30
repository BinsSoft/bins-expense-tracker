import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../dialog/category-add/category-add.component";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  categoryList: any = [];
  constructor(public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit(): void {
    this.categoryList = this.commonService.categoryInit();

  }
  addNewCategory() {
    this.dialog.open(CategoryAddComponent).afterClosed().subscribe((result:any)=>{
      if (result) {
        this.categoryList = this.commonService.appendCategory(result,  this.categoryList);
        this.commonService.setCategoryList(this.categoryList);
      }
    });
  }
}
