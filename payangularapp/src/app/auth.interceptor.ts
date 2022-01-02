import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedOut()) {
      if (this.authService.isRefreshPossible()) {
        return this.authService.refresh().pipe(
          // the request is executed after the refresh
          mergeMap(() => this.addAuthenticationHeader(req, next))
          );
      } else {
        this.router.navigate(['login']);
      }
    }

    return this.addAuthenticationHeader(req, next);
  }

  private addAuthenticationHeader(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getAccessToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(AuthService.TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(
      catchError(error => this.goToLoginIfNotAuthenticated(error))
    );
  }

  private goToLoginIfNotAuthenticated(error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
    if (error.status == 401) {
      this.router.navigate(['login']);
    } else {
      alert("Something went wrong. Maybe try again.");
    }
    return throwError(error.message);
  }
}
