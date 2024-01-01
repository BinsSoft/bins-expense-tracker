import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./module/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './component/landing/landing.component';
import { ActionComponent } from './component/action/action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryManageComponent } from './component/category-manage/category-manage.component';
import { UserManageComponent } from './component/user-manage/user-manage.component';
import { HeaderComponent } from './component/header/header.component';
import { CategoryAddComponent } from './component/dialog/category-add/category-add.component';
import { CategoryTreeComponent } from './component/category-tree/category-tree.component';
import { CategoryActionComponent } from './component/dialog/category-action/category-action.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { UsersAddComponent } from './component/dialog/users-add/users-add.component';
import { TransactionFilterComponent } from './component/dialog/transaction-filter/transaction-filter.component';
import { AuthenticateonComponent } from './component/authenticateon/authenticateon.component';
import {HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './component/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ActionComponent,
    CategoryManageComponent,
    UserManageComponent,
    HeaderComponent,
    CategoryAddComponent,
    CategoryTreeComponent,
    CategoryActionComponent,
    TransactionsComponent,
    UsersAddComponent,
    TransactionFilterComponent,
    AuthenticateonComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
