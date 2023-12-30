import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {CategoryAddComponent} from "../dialog/category-add/category-add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  @Input('type')type: string = '';
  @Input('categoryList')categoryList: any = [];
  @Output('select') onSelect = new EventEmitter<any>();

  constructor(public dialog: MatDialog,private commonService: CommonService) { }

  ngOnInit(): void {

  }
  addNewCategory(data: any) {
    this.dialog.open(CategoryAddComponent).afterClosed().subscribe((result:any)=>{
      if (result) {
        this.commonService.appendCategory(result, data);
        this.commonService.setCategoryList(this.categoryList);
      }
    });
  }
  editNewCategory(data: any) {
    this.dialog.open(CategoryAddComponent, {
      data: data
    }).afterClosed().subscribe((result:any)=>{
      if (result) {
        data.name = result;
        this.commonService.categoryList = this.categoryList;
        window.localStorage.setItem('_c', JSON.stringify(this.categoryList));
      }
    });
  }

  selectCategory(data: any) {
    if (this.type == 'action') {
      let selectedCategory = '';
      if(data.parent) {
        selectedCategory = data.parent+'>';
      }
      selectedCategory += data.name;
      this.onSelect.emit(selectedCategory)
    }
  }

  getParent(root:any, name:any) {

  }
}
