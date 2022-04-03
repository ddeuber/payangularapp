import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly ACCESS_TOKEN_EXPIRATION_KEY = 'access_token_expiration';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly REFRESH_TOKEN_EXPIRATION_KEY = 'refresh_token_expiration';

  constructor() { }

  setAccessToken(accessToken: string): void {
    localStorage.setItem(TokenService.ACCESS_TOKEN_KEY, accessToken);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(TokenService.REFRESH_TOKEN_KEY, refreshToken);
  }

  setAccessTokenExpiration(accessTokenExpiration: moment.Moment): void {
    localStorage.setItem(TokenService.ACCESS_TOKEN_EXPIRATION_KEY, JSON.stringify(accessTokenExpiration));
  }

  setRefreshTokenExpiration(refreshTokenExpiration: moment.Moment): void {
    localStorage.setItem(TokenService.REFRESH_TOKEN_EXPIRATION_KEY, JSON.stringify(refreshTokenExpiration));
  }

  clearTokens(): void {
    localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
    localStorage.removeItem(TokenService.REFRESH_TOKEN_EXPIRATION_KEY);
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenService.ACCESS_TOKEN_EXPIRATION_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(TokenService.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(TokenService.REFRESH_TOKEN_KEY);
  }

  getAccessTokenExpiration(): moment.Moment | null {
    return this.getTokenExpiration(TokenService.ACCESS_TOKEN_EXPIRATION_KEY);
  }

  getRefreshTokenExpiration(): moment.Moment | null {
    return this.getTokenExpiration(TokenService.REFRESH_TOKEN_EXPIRATION_KEY);
  }

  private getTokenExpiration(expirationKey: string): moment.Moment | null {
    const expiration = localStorage.getItem(expirationKey);
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
