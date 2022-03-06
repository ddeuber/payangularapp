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

const routes: Routes = [
  { path: 'login', component: LoginContainerComponent},
  { path: '', redirectTo: 'groups', pathMatch: 'full'},
  { path: 'groups', component: GroupListContainerComponent},
  { path: 'groups/:id', component: GroupOverviewContainerComponent},
  { path: 'groups/:id/transactions', component: TransactionListContainerComponent},
  { path: 'groups/:id/transaction', component: TransactionDetailsContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
