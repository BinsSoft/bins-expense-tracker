import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {CategoryAddComponent} from "../dialog/category-add/category-add.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit, OnChanges {

  @Input('type')type: string = '';
  @Input('categoryList')categoryList: any = [];
  @Output('select') onSelect = new EventEmitter<any>();
  rootCategory:any = [];
  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,private commonService: CommonService) { }

  ngOnInit(): void {

  }
  addNewCategory(data: any) {
    this.dialog.open(CategoryAddComponent).afterClosed().subscribe((result:any)=>{
      if (result) {
        this.categoryList.push({
          id: this.categoryList.length +1,
          name: result.name,
          repeatDate: (result.isRepeat)? result.repeatDate : 0,
          parent: data.id
        });
        this.transactionService.categoryList = this.categoryList;
        this.transactionService.updateConfig();
      }
    });
  }
  editNewCategory(data: any) {
    this.dialog.open(CategoryAddComponent, {
      data: data
    }).afterClosed().subscribe((result:any)=>{
      if (result) {
        data.name = result.name;
        data.repeatDate = (result.isRepeat)? result.repeatDate : 0;
        this.transactionService.categoryList = this.categoryList;
        this.transactionService.updateConfig();
      }
    });
  }

  selectCategory(data: any) {
    if (this.type == 'action') {
      let selectedCategory:any = [];
      let category = data;
      while (category.parent != undefined) {
        selectedCategory.push( category);
        category = this.categoryList.find((c: any) => c.id == category.parent);
      }
      if (!category.parent) {
        selectedCategory.push( category);
      }

      this.onSelect.emit(selectedCategory)
    }
  }
  generateChildCategory(category:any, categoryList:any) {
    category.children = categoryList.filter((p:any)=> p.parent != null && p.parent == category.id);
    category.children.map((c:any)=>{
      return {
        ...c,
        category: this.generateChildCategory(c, categoryList)
      }
    })
    return category;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let category of <Array<any>>this.categoryList) {
      if (category['parent'] == null) {
        category['children'] = [];
        category = this.generateChildCategory(category, this.categoryList);
        this.rootCategory.push(category);
      }
    }
  }

  deleteCategory(data: any) {
    this.transactionService.categoryList.splice(this.transactionService.categoryList.findIndex((c:any)=>c.id == data.id),1);
    this.transactionService.updateConfig();
  }
}
