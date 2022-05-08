import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor() { }

  setAccessToken(accessToken: string): void {
    localStorage.setItem(TokenService.ACCESS_TOKEN_KEY, accessToken);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(TokenService.REFRESH_TOKEN_KEY, refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(TokenService.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(TokenService.REFRESH_TOKEN_KEY);
  }
}
