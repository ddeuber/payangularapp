import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { TokenService } from './token.service';
import { Credentials } from '../model/credentials';

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

  static readonly TOKEN_HEADER_KEY = 'Authorization'; // for JWT

  private http: HttpClient;

  constructor(private httpBackend: HttpBackend, private tokenService: TokenService) {
    // We use the client from the backend in order to bypass the AuthInterceptor.
    this.http = new HttpClient(httpBackend);
  }

  login(credentials: Credentials): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(environment.baseUrl + '/login', { 'email': credentials.email, 'password': credentials.password })
      .pipe(
        tap((tokens: JwtTokens) => this.setSession(tokens))
      );
  }

  private setSession(tokens: JwtTokens): void {
    const accessTokenExpiresAt = moment().add(AuthService.ACCESS_TOKEN_VALID_MINUTES, 'minute');
    const refreshTokenExpiresAt = moment().add(AuthService.REFRESH_TOKEN_VALID_DAYS, 'day');

    this.tokenService.setAccessToken(tokens.access_token);
    this.tokenService.setRefreshToken(tokens.refresh_token);
    this.tokenService.setAccessTokenExpiration(accessTokenExpiresAt);
    this.tokenService.setRefreshTokenExpiration(refreshTokenExpiresAt);
  }

  logout(): void {
    this.tokenService.clearTokens();
  }

  isLoggedIn(): boolean {
    const accessTokenExpiration = this.tokenService.getAccessTokenExpiration();
    if (!accessTokenExpiration) {
      return false;
    }

    return moment().isBefore(accessTokenExpiration);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  isRefreshPossible(): boolean {
    const refreshTokenExpiration = this.tokenService.getRefreshTokenExpiration();
    if (!refreshTokenExpiration) {
      return false;
    }

    return moment().isBefore(refreshTokenExpiration);
  }

  refresh(): Observable<AccessToken> {
    let refreshToken = this.tokenService.getRefreshToken();
    if (refreshToken == null) {
      throw new Error('No refresh token found for refresh.');
    }

    let headers = new HttpHeaders();
    headers = headers.set(AuthService.TOKEN_HEADER_KEY, 'Bearer ' + refreshToken);

    return this.http.post<AccessToken>(environment.baseUrl + '/refresh', {}, { headers: headers })
      .pipe(
        tap((token: AccessToken) => {
          const jwtTokens: JwtTokens = {
            'access_token': token.access_token,
            'refresh_token': refreshToken!
          }
          this.setSession(jwtTokens);
        })
      );
  }
}
