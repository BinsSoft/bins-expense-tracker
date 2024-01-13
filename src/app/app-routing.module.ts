import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./component/landing/landing.component";
import {ActionComponent} from "./component/action/action.component";
import {CategoryManageComponent} from "./component/category-manage/category-manage.component";
import {UserManageComponent} from "./component/user-manage/user-manage.component";
import {TransactionsComponent} from "./component/transactions/transactions.component";
import {AuthenticateonComponent} from "./component/authenticateon/authenticateon.component";
import {LayoutComponent} from "./component/layout/layout.component";
import {NotificationsComponent} from "./notifications/notifications.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'auth',
    component: AuthenticateonComponent
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
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
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
