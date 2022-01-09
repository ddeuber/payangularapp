import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListContainerComponent } from './components/group-list-container/group-list-container.component';
import { GroupOverviewContainerComponent } from './components/group-overview-container/group-overview-container.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';

const routes: Routes = [
  { path: 'login', component: LoginContainerComponent},
  { path: 'groups/:id', component: GroupOverviewContainerComponent},
  { path: 'groups', component: GroupListContainerComponent},
  { path: '', redirectTo: 'groups', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
