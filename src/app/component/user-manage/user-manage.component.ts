import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CommonService} from "../../service/common.service";
import {CategoryAddComponent} from "../dialog/category-add/category-add.component";
import {UsersAddComponent} from "../dialog/users-add/users-add.component";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  usersList: any =[];
  constructor(
    public dialog: MatDialog, private commonService: CommonService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.users.subscribe((response: any)=>{
      this.usersList = response;
    });
    this.usersList = this.transactionService.getAllUsers();
  }

  addNewUser() {
    this.dialog.open(UsersAddComponent).afterClosed().subscribe((result:any)=>{
      if (result) {
       this.usersList.push({
         name: result
       })
        this.transactionService.userList = this.usersList;
       this.transactionService.updateConfig();
      }
    });
  }

  editUser(data: any) {
    this.dialog.open(UsersAddComponent, {
      data: {
        name: data.name
      }

    }).afterClosed().subscribe((result:any)=>{
      if (result) {
       data.name = result;
        this.transactionService.userList = this.usersList;
        this.transactionService.updateConfig();
      }
    });
  }
}
