import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  syncData() {
    this.transactionService.updateTransactions();

  }
}
