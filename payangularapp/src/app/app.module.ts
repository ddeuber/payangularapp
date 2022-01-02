import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { AuthInterceptor } from './auth.interceptor';
import { GroupCreationDialogComponent } from './components/group-creation-dialog/group-creation-dialog.component';
import { GroupOverviewComponent } from './components/group-overview/group-overview.component';
import { BalanceTableComponent } from './components/balance-table/balance-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupCreationDialogComponent,
    GroupOverviewComponent,
    BalanceTableComponent,
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
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
