import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from "@angular/material/menu";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { AuthInterceptor } from './auth.interceptor';
import { GroupCreationDialogComponent } from './components/group-creation-dialog/group-creation-dialog.component';
import { GroupOverviewComponent } from './components/group-overview/group-overview.component';
import { BalanceTableComponent } from './components/balance-table/balance-table.component';
import { StandingOrderTableComponent } from './components/standing-order-table/standing-order-table.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { GroupOverviewContainerComponent } from './components/group-overview-container/group-overview-container.component';
import { GroupListContainerComponent } from './components/group-list-container/group-list-container.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';
import { LeaveGroupDialogComponent } from './components/leave-group-dialog/leave-group-dialog.component';
import { AddMemberDialogComponent } from './components/add-member-dialog/add-member-dialog.component';
import { TopLevelSpinnerComponent } from './components/top-level-spinner/top-level-spinner.component';
import { AddTransactionContainerComponent } from './components/add-transaction-container/add-transaction-container.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { AddParticipantDialogComponent } from './components/add-participant-dialog/add-participant-dialog.component';
import { TransactionListContainerComponent } from './components/transaction-list-container/transaction-list-container.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionListFilterComponent } from './components/transaction-list-filter/transaction-list-filter.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionDetailsContainerComponent } from './components/transaction-details-container/transaction-details-container.component';
import { GroupSettingsContainerComponent } from './components/group-settings-container/group-settings-container.component';
import { GroupSettingsComponent } from './components/group-settings/group-settings.component';
import { StandingOrderDetailsContainerComponent } from './components/standing-order-details-container/standing-order-details-container.component';
import { StandingOrderDetailsComponent } from './components/standing-order-details/standing-order-details.component';
import { DeleteStandingOrderDialogComponent } from './components/delete-standing-order-dialog/delete-standing-order-dialog.component';
import { AddStandingOrderContainerComponent } from './components/add-standing-order-container/add-standing-order-container.component';
import { AddStandingOrderComponent } from './components/add-standing-order/add-standing-order.component';

registerLocaleData(localeDe);
// TODO: import swiss locale (or general?), also make timezone more general -> summertime is not used

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupCreationDialogComponent,
    GroupOverviewComponent,
    BalanceTableComponent,
    StandingOrderTableComponent,
    GroupOverviewContainerComponent,
    GroupListContainerComponent,
    LoginContainerComponent,
    LeaveGroupDialogComponent,
    AddMemberDialogComponent,
    TopLevelSpinnerComponent,
    AddTransactionContainerComponent,
    AddTransactionComponent,
    AddParticipantDialogComponent,
    TransactionListContainerComponent,
    TransactionListComponent,
    TransactionListFilterComponent,
    TransactionDetailsComponent,
    TransactionDetailsContainerComponent,
    GroupSettingsContainerComponent,
    GroupSettingsComponent,
    StandingOrderDetailsContainerComponent,
    StandingOrderDetailsComponent,
    DeleteStandingOrderDialogComponent,
    AddStandingOrderContainerComponent,
    AddStandingOrderComponent,
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatTableModule,
        MatTabsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCheckboxModule,
        HttpClientModule,
        MatMenuModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
