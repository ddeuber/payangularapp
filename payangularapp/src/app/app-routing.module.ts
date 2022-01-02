import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupOverviewComponent } from './components/group-overview/group-overview.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'groups/:id', component: GroupOverviewComponent},
  { path: 'groups', component: GroupListComponent},
  { path: '', redirectTo: 'groups', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
