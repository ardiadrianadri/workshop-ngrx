import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthToken } from './auth-token';

export const AUTH_TOKEN: InjectionToken<AuthToken> = new InjectionToken<AuthToken>('AUTH_TOKEN ');

export function getAuthToken (http: HttpClient): Observable<AuthToken> {
  return http.get<AuthToken>('/assets/marvel-keys.afe.json');
}
