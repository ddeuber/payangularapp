import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTransactionContainerComponent } from './components/add-transaction-container/add-transaction-container.component';
import { GroupListContainerComponent } from './components/group-list-container/group-list-container.component';
import { GroupOverviewContainerComponent } from './components/group-overview-container/group-overview-container.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';

const routes: Routes = [
  { path: 'login', component: LoginContainerComponent},
  { path: '', redirectTo: 'groups', pathMatch: 'full'},
  { path: 'groups', component: GroupListContainerComponent},
  { path: 'groups/:id', component: GroupOverviewContainerComponent},
  { path: 'groups/:id/addtransaction', component: AddTransactionContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
