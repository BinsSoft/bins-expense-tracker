import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../service/transaction.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpeekToTransactionComponent} from "../component/dialog/speek-to-transaction/speek-to-transaction.component";
import {MatDialog} from "@angular/material/dialog";
import {RestService} from "../service/rest.service";
import {Router} from "@angular/router";
import {FavoritesManageComponent} from "../component/dialog/favorites-manage/favorites-manage.component";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  transactionList:any = [];
  authUser:any = null;
  favoritesSha: any =null;
  favoritesList:any =[];
  constructor(
    private restService: RestService,
    private transactionService: TransactionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
    ) {
    this.transactionService.transactions.subscribe((transaction:any)=>{
      this.generateTransactions(transaction);
    });
  }


  getFavoritesList() {
    this.authUser = window.localStorage.getItem('_user');
    this.restService.getContent(this.authUser+'/favorites.json').subscribe((response:any)=>{
      this.favoritesSha = response.sha;
      this.favoritesList = JSON.parse(atob(response.content));
      this.favoritesList = this.favoritesList
        .map((item:any)=>{
          return {
            ...item,
            status: (new Date(item.l_p_t).getMonth() == new Date().getMonth() )? '':'PENDING'
          }
        });
    })
  }

  generateTransactions(list:any) {
    const rawList = list;
    this.favoritesList = this.favoritesList
      .map((item:any)=>{
        return {
          ...item,
          status: (list.filter((i:any)=> i.r_i == item.i && new Date(i.d).getMonth() == new Date().getMonth()).length>0 )? '':'PENDING'
        }
      });
  }
  transactionAction(type:string, transactionItem:any, index:number) {
    if (type == 'remove') {
      this._snackBar.open("Want to remove from the list?", "Yes",{
        duration: 2000,
        horizontalPosition:'center',
        verticalPosition:"top"
      }).afterDismissed().subscribe((response:any)=> {
        if (response.dismissedByAction) {
          this.favoritesList.splice(index,1);
          this.restService.update(this.authUser + '/favorites.json', 'delete favorites item of ' + this.authUser, this.favoritesList, this.favoritesSha).subscribe((response: any) => {

          });
          this._snackBar.open("Transaction is removed !!", "", {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: "top"
          })
        }
      });
    }
    else if(type =='edit') {
      this.dialog.open(FavoritesManageComponent, {
        width: '80%',
        autoFocus:false,
        data: {
          item: transactionItem,
          index: index
        }
      }).afterClosed().subscribe((response:any)=>{
        this.favoritesList[index].c = response;
        this.restService.update(this.authUser + '/favorites.json', 'Update Transactions of ' + this.authUser, this.favoritesList, this.favoritesSha).subscribe((response: any) => {
          this.favoritesSha = response.content.sha
        });
      })
    }
    else if (type =='re-pay') {
      console.log(transactionItem);
      this.dialog.open(SpeekToTransactionComponent, {
        width: '80%',
        data: {
          newId: this.transactionList.length+1,
          type: transactionItem.t,
          c: transactionItem.c,
          r_i: transactionItem.i
        }
      }).afterClosed().subscribe((result:any)=>{
        this.router.navigate(['transactions'])
      });
    }
  }

  ngOnInit(): void {
    this.transactionService.emitAllTransactions();
    this.getFavoritesList();
  }

}
