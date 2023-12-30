import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./component/landing/landing.component";
import {ActionComponent} from "./component/action/action.component";
import {CategoryManageComponent} from "./component/category-manage/category-manage.component";
import {UserManageComponent} from "./component/user-manage/user-manage.component";
import {TransactionsComponent} from "./component/transactions/transactions.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'action',
    component: ActionComponent
  },
  {
    path: 'category',
    component: CategoryManageComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'user',
    component: UserManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
