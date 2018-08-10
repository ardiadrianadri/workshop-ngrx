import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { ApiMarvelService } from './api-marvel.service';
import {
  AUTH_TOKEN,
  getAuthToken,
  MARVEL_ENDPOINTS,
  getEndpoints
} from '../config';

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    { provide: AUTH_TOKEN, useFactory: getAuthToken, deps: [HttpClient] },
    { provide: MARVEL_ENDPOINTS, useFactory: getEndpoints, deps: [HttpClient] },
    AuthService,
    ApiMarvelService
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() private _parent: CoreModule) {
    if (this._parent) {
      throw new Error('Error: The core module only can be injected once');
    }
  }
}
