import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

interface JwtTokens {
  access_token: string;
  refresh_token: string;
}

interface AccessToken {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly ACCESS_TOKEN_VALID_MINUTES = 5;
  private static readonly REFRESH_TOKEN_VALID_DAYS = 29;

  private http: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    // We use the client from the backend in order to bypass the auth interceptor.
    this.http = new HttpClient(httpBackend);
  }

  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(environment.baseUrl + '/login', { email, password })
      .pipe(
        tap((tokens: JwtTokens) => this.setSession(tokens))
      );
  }

  private setSession(tokens: JwtTokens): void {
    const accessTokenExpiresAt = moment().add(AuthService.ACCESS_TOKEN_VALID_MINUTES, 'minute');
    const refreshTokenExpiresAt = moment().add(AuthService.REFRESH_TOKEN_VALID_DAYS, 'day');

    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('refresh_token_expiration', refreshTokenExpiresAt.toString())
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('access_token_expiration', accessTokenExpiresAt.toString())
  }

  logout(): void {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_expiration');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expiration');
  }

  isLoggedIn(): boolean {
    const accessTokenExpiration = this.getAccessTokenExpiration();
    if (!accessTokenExpiration) {
      return false;
    }

    return moment().isBefore(accessTokenExpiration);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getAccessTokenExpiration(): moment.Moment | null {
    return this.getTokenExpiration('access_token_expiration');
  }

  private getRefreshTokenExpiration(): moment.Moment | null {
    return this.getTokenExpiration('refresh_token_expiration');
  }

  private getTokenExpiration(expirationKey: string): moment.Moment | null {
    const expiration = localStorage.getItem(expirationKey);
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isRefreshPossible(): boolean {
    const refreshTokenExpiration = this.getRefreshTokenExpiration();
    if (!refreshTokenExpiration) {
      return false;
    }

    return moment().isBefore(refreshTokenExpiration);
  }

  refresh(): Observable<AccessToken> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token'));
    let refreshToken: string = localStorage.getItem('refresh_token')!;

    return this.http.post<AccessToken>(environment.baseUrl + '/refresh', headers)
      .pipe(
        tap((token: AccessToken) => {
          const jwtTokens: JwtTokens = {
            'access_token': token.access_token,
            'refresh_token': refreshToken
          }
          this.setSession(jwtTokens);
        })
      );
  }
}
