import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./module/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './component/landing/landing.component';
import { ActionComponent } from './component/action/action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { UsersAddComponent } from './component/dialog/users-add/users-add.component';
import { TransactionFilterComponent } from './component/dialog/transaction-filter/transaction-filter.component';
import { AuthenticateonComponent } from './component/authenticateon/authenticateon.component';
import {HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './component/layout/layout.component';
import { CateoryFlagPipe } from './pipes/cateory-flag.pipe';
import { UserFlagPipe } from './pipes/user-flag.pipe';
import { NotificationsComponent } from './notifications/notifications.component';
import { SpeekToTransactionComponent } from './component/dialog/speek-to-transaction/speek-to-transaction.component';
import { CustomAmountPipe } from './pipes/custom-amount.pipe';
import { FavoritesManageComponent } from './component/dialog/favorites-manage/favorites-manage.component';
import { ArchiveManageComponent } from './component/archive-manage/archive-manage.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ActionComponent,
    HeaderComponent,
    TransactionsComponent,
    UsersAddComponent,
    TransactionFilterComponent,
    AuthenticateonComponent,
    LayoutComponent,
    CateoryFlagPipe,
    UserFlagPipe,
    NotificationsComponent,
    SpeekToTransactionComponent,
    CustomAmountPipe,
    FavoritesManageComponent,
    ArchiveManageComponent,
    StatisticsComponent
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
