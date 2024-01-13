import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../service/transaction.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  categoryList: any = [];
  constructor(private transactionService: TransactionService) {
    this.transactionService.category.subscribe((response: any)=>{
      this.categoryList = response;
    });
    this.categoryList = this.transactionService.getAllCategory();

  }

  ngOnInit(): void {

    setTimeout(()=>{
      const currentDay = new Date().getDate();
      // console.log(currentDay)
      this.categoryList = this.categoryList.filter((c:any)=> c.repeatDate != undefined && c.repeatDate >= currentDay );
      // console.log(this.categoryList);
    },1000)

  }

}
