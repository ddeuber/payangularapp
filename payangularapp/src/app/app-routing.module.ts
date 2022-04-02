import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListContainerComponent } from './components/group-list-container/group-list-container.component';
import { GroupOverviewContainerComponent } from './components/group-overview-container/group-overview-container.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';
import {
  TransactionListContainerComponent
} from "./components/transaction-list-container/transaction-list-container.component";
import {
  TransactionDetailsContainerComponent
} from "./components/transaction-details-container/transaction-details-container.component";
import {
  GroupSettingsContainerComponent
} from "./components/group-settings-container/group-settings-container.component";
import {
  StandingOrderDetailsContainerComponent
} from "./components/standing-order-details-container/standing-order-details-container.component";
import {SignUpContainerComponent} from "./components/sign-up-container/sign-up-container.component";
import {
  ForgotPasswordContainerComponent
} from "./components/forgot-password-container/forgot-password-container.component";
import {
  ResetPasswordContainerComponent
} from "./components/reset-password-container/reset-password-container.component";

const routes: Routes = [
  { path: 'login', component: LoginContainerComponent},
  { path: 'signup', component: SignUpContainerComponent},
  { path: 'forgotpassword', component: ForgotPasswordContainerComponent},
  { path: 'resetpassword', component: ResetPasswordContainerComponent},
  { path: '', redirectTo: 'groups', pathMatch: 'full'},
  { path: 'groups', component: GroupListContainerComponent},
  { path: 'groups/:id', component: GroupOverviewContainerComponent},
  { path: 'groups/:id/transactions', component: TransactionListContainerComponent},
  { path: 'groups/:id/transaction', component: TransactionDetailsContainerComponent},
  { path: 'groups/:id/settings', component: GroupSettingsContainerComponent},
  { path: 'groups/:id/standingOrder', component: StandingOrderDetailsContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
