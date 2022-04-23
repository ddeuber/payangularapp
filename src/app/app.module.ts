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
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/groups/group-list/group-list.component';
import { GroupItemComponent } from './components/groups/group-item/group-item.component';
import { AuthInterceptor } from './auth.interceptor';
import { GroupCreationDialogComponent } from './components/groups/group-creation-dialog/group-creation-dialog.component';
import { GroupOverviewComponent } from './components/groups/group-overview/group-overview.component';
import { BalanceTableComponent } from './components/groups/balance-table/balance-table.component';
import { StandingOrderTableComponent } from './components/standingorders/standing-order-table/standing-order-table.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { GroupOverviewContainerComponent } from './components/groups/group-overview-container/group-overview-container.component';
import { GroupListContainerComponent } from './components/groups/group-list-container/group-list-container.component';
import { LoginContainerComponent } from './components/authentication/login-container/login-container.component';
import { LeaveGroupDialogComponent } from './components/groups/leave-group-dialog/leave-group-dialog.component';
import { AddMemberDialogComponent } from './components/groups/add-member-dialog/add-member-dialog.component';
import { TopLevelSpinnerComponent } from './components/util/top-level-spinner/top-level-spinner.component';
import { AddTransactionContainerComponent } from './components/transactions/add-transaction-container/add-transaction-container.component';
import { AddTransactionComponent } from './components/transactions/add-transaction/add-transaction.component';
import { AddParticipantDialogComponent } from './components/groups/add-participant-dialog/add-participant-dialog.component';
import { TransactionListContainerComponent } from './components/transactions/transaction-list-container/transaction-list-container.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { TransactionListFilterComponent } from './components/transactions/transaction-list-filter/transaction-list-filter.component';
import { TransactionDetailsComponent } from './components/transactions/transaction-details/transaction-details.component';
import { TransactionDetailsContainerComponent } from './components/transactions/transaction-details-container/transaction-details-container.component';
import { GroupSettingsContainerComponent } from './components/groups/group-settings-container/group-settings-container.component';
import { GroupSettingsComponent } from './components/groups/group-settings/group-settings.component';
import { StandingOrderDetailsContainerComponent } from './components/standingorders/standing-order-details-container/standing-order-details-container.component';
import { StandingOrderDetailsComponent } from './components/standingorders/standing-order-details/standing-order-details.component';
import { DeleteStandingOrderDialogComponent } from './components/standingorders/delete-standing-order-dialog/delete-standing-order-dialog.component';
import { AddStandingOrderContainerComponent } from './components/standingorders/add-standing-order-container/add-standing-order-container.component';
import { AddStandingOrderComponent } from './components/standingorders/add-standing-order/add-standing-order.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { SignUpContainerComponent } from './components/authentication/sign-up-container/sign-up-container.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ForgotPasswordContainerComponent } from './components/authentication/forgot-password-container/forgot-password-container.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { ResetPasswordContainerComponent } from './components/authentication/reset-password-container/reset-password-container.component';
import { PayappToolbarComponent } from './components/util/payapp-toolbar/payapp-toolbar.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';

registerLocaleData(localeDe);
// TODO: extract matSnackBar into own component to reduce code duplication

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
    SignUpComponent,
    SignUpContainerComponent,
    ForgotPasswordComponent,
    ForgotPasswordContainerComponent,
    ResetPasswordComponent,
    ResetPasswordContainerComponent,
    PayappToolbarComponent,
    LogoutComponent,
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
