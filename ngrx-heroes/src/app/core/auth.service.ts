import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

import { AuthToken, AUTH_TOKEN } from '../config';
import { Auth } from './auth';

@Injectable()
export class AuthService {

  constructor(
    @Inject(AUTH_TOKEN) private _authTokens$: Observable<AuthToken>
  ) {}

  public getAuthParameters(): Observable<Auth> {

    return this._authTokens$.pipe(
      map((authTokens: AuthToken) => {
        let ts: string;
        let hash: string;
        let apikey: string;

        const md5 = new Md5();

        ts = new Date().getTime().toString();
        apikey = authTokens.marvelPublicKey;

        md5.appendStr(ts);
        md5.appendStr(authTokens.marvelPrivateKey);
        md5.appendStr(authTokens.marvelPublicKey);

        hash = md5.end().toString();

        return {
          ts: ts,
          hash: hash,
          apikey: apikey
        };
      }
    ));
  }
}
