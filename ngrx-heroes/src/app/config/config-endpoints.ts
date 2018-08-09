import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MarvelEndPoints } from './marvel-endpoints';

export const idExpr = '##id##';

export const MARVEL_ENDPOINTS: InjectionToken<MarvelEndPoints> = new InjectionToken<MarvelEndPoints>('MARVEL_ENDPOINTS');

export function getEndpoints (http: HttpClient): Observable<MarvelEndPoints> {
  return http.get<MarvelEndPoints>('/assets/marvel-endpoints.json');
}
