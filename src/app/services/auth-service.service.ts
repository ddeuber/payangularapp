import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenService} from './token.service';
import {Credentials} from '../model/credentials';
import {JwtHelperService} from '@auth0/angular-jwt';

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

  static readonly TOKEN_HEADER_KEY = 'Authorization'; // for JWT

  private http: HttpClient;
  private jwtHelper: JwtHelperService;

  constructor(private httpBackend: HttpBackend, private tokenService: TokenService) {
    // We use the client from the backend in order to bypass the AuthInterceptor.
    this.http = new HttpClient(httpBackend);
    this.jwtHelper = new JwtHelperService();
  }

  login(credentials: Credentials): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(environment.baseUrl + '/login', credentials)
      .pipe(
        tap((tokens: JwtTokens) => this.setSession(tokens))
      );
  }

  private setSession(tokens: JwtTokens): void {
    this.tokenService.setAccessToken(tokens.access_token);
    this.tokenService.setRefreshToken(tokens.refresh_token);
  }

  logout(): void {
    this.tokenService.clearTokens();
  }

  isLoggedIn(): boolean {
    const accessToken = this.tokenService.getAccessToken();
    if (!accessToken) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  isRefreshPossible(): boolean {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(refreshToken);
  }

  refresh(): Observable<AccessToken> {
    let refreshToken = this.tokenService.getRefreshToken();
    if (refreshToken == null) {
      throw new Error('No refresh token found for refresh.');
    }

    let headers = new HttpHeaders();
    headers = headers.set(AuthService.TOKEN_HEADER_KEY, 'Bearer ' + refreshToken);

    return this.http.post<AccessToken>(environment.baseUrl + '/refresh', {}, {headers: headers})
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

  signUp(credentials: Credentials): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/signup', credentials)
  }

  forgotPassword(email: string): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/forgotpassword', {email});
  }

  resetPassword(newPassword: string, accessToken: string): Observable<unknown> {
    let authHeaders = new HttpHeaders();
    authHeaders = authHeaders.set(AuthService.TOKEN_HEADER_KEY, 'Bearer ' + accessToken);
    return this.http.post<unknown>(environment.baseUrl + '/resetpassword', {password: newPassword}, {headers: authHeaders});
  }
}
