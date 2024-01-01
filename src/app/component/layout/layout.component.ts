import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.fetch();
  }

}
