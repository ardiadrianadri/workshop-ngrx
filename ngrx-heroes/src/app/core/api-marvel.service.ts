import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import {
  MarvelEndPoints,
  MARVEL_ENDPOINTS,
  idExpr
} from '../config';

import {
  MarvelAnswer,
  MarvelElement,
  MarvelHero
} from '../common';

import { Auth } from './auth';
import { AuthService } from './auth.service';

@Injectable()
export class ApiMarvelService {

  private _endpoints: MarvelEndPoints;

  constructor(
    @Inject(MARVEL_ENDPOINTS) private _marvelUrls$: Observable<MarvelEndPoints>,
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  private _setAuthParams (url: string, authParams: Auth): string {
    return (url.indexOf('?') < 0) ?
    `${url}?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}` :
    `${url}&ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`;
  }

  private _setPageParams (url: string, limit: number, offset: number): string {
    return (url.indexOf('?') < 0) ?
    `${url}?limit=${limit}&offset=${offset}` :
    `${url}&limit=${limit}&offset=${offset}`;
  }

  private _buildMarvelAnswer (data: MarvelHero[] | MarvelElement[], answerData: any): MarvelAnswer {
    return {
      limit: answerData.limit,
      offset: answerData.offset,
      total: answerData.total,
      count: answerData.count,
      result: data
    };
  }

  private _filterEmptyResults (data: MarvelElement | MarvelHero): boolean {
    let result: boolean;
    let marvelElement: MarvelElement;
    let marvelHero: MarvelHero;

    if ('title' in data) {
      marvelElement = (data as MarvelElement);
      result = ((marvelElement.title !== '') || (marvelElement.description !== ''));
    } else {
      marvelHero = (data as MarvelHero);
      result = ((marvelHero.name !== '') || (marvelHero.description !== ''));
    }

    return result;
  }

  public getListHeroes(name: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelUrls$
    .pipe(
      concatMap((endpoints: MarvelEndPoints) => {
        this._endpoints = endpoints;
        return this._authService.getAuthParameters();
      }),
      concatMap ((authPraams: Auth) => {
        let finalUrl = this._setAuthParams(this._endpoints.searchCharacter, authPraams);
        finalUrl = `${finalUrl}&nameStartsWith=${name}`;
        finalUrl = this._setPageParams(finalUrl, limit, offset);
        return this._http.get(finalUrl);
      }),
      map((answer: any) => {
        const heroes: MarvelHero[] = answer.data.results.map((marvelHero: any) => {
          const hero: MarvelHero = {
            id: marvelHero.id,
            name: marvelHero.name,
            description: marvelHero.description,
            image: `${marvelHero.thumbnail.path}.${marvelHero.thumbnail.extension}`
          };
          return hero;
        })
        .filter((hero: MarvelHero) => this._filterEmptyResults(hero));

        return this._buildMarvelAnswer(heroes, answer.data);
      }),
      catchError(error => Observable.throw(error))
    );
  }

  public getDetailsHero(id: string): Observable<MarvelAnswer> {
    return this._marvelUrls$
    .pipe(
      concatMap((endpoints: MarvelEndPoints) => {
        this._endpoints = endpoints;
        return this._authService.getAuthParameters();
      }),
      concatMap((authParams: Auth) => {
        let finalUrl = this._endpoints.detailsCharacter.replace(idExpr, id);
        finalUrl = this._setAuthParams(finalUrl, authParams);

        return this._http.get(finalUrl);
      }),
      map((answer: any) => {
        const hero: MarvelHero = {
          id: answer.data.results[0].id,
          name: answer.data.results[0].name,
          description: answer.data.results[0].description,
          image: `${answer.data.results[0].thumbnail.path}.${answer.data.results[0].thumbnail.extension}`
        };

        return this._buildMarvelAnswer([hero], answer.data);
      }),
      catchError(error => Observable.throw(error))
    );
  }

  public getListComics(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelUrls$
    .pipe(
      concatMap((endpoints: MarvelEndPoints) => {
        this._endpoints = endpoints;
        return this._authService.getAuthParameters();
      }),
      concatMap((authParams: Auth) => {
        let finalUrl = this._endpoints.comicsCharacter.replace(idExpr, id);
          finalUrl = this._setAuthParams(finalUrl, authParams);
          finalUrl = this._setPageParams(finalUrl, limit, offset);

          return this._http.get(finalUrl);
        }),
        map ((answer: any) => {
          const comics: MarvelElement[] = answer.data.results.map((marvelComic: any) => {
            const comic: MarvelElement = {
              id: marvelComic.id,
              title: marvelComic.title,
              description: marvelComic.description
            };

            return comic;
          })
          .filter((comic: MarvelElement) => this._filterEmptyResults(comic));

          return this._buildMarvelAnswer(comics, answer.data);
        }),
        catchError(error => Observable.throw(error))
    );
  }

  public getListSeries(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelUrls$
    .pipe(
      concatMap((endpoints: MarvelEndPoints) => {
        this._endpoints = endpoints;
        return this._authService.getAuthParameters();
      }),
      concatMap((authParams: Auth) => {
        let finalUrl = this._endpoints.seriesCharacter.replace(idExpr, id);
        finalUrl = this._setAuthParams(finalUrl, authParams);
        finalUrl = this._setPageParams(finalUrl, limit, offset);

        return this._http.get(finalUrl);
      }),
      map ((answer: any) => {
        const series: MarvelElement[] = answer.data.results.map((marvelSerie: any) => {
          const serie: MarvelElement = {
            id: marvelSerie.id,
            title: marvelSerie.title,
            description: marvelSerie.description
          };

          return serie;
        })
        .filter((serie: MarvelElement) => this._filterEmptyResults(serie));

        return this._buildMarvelAnswer(series, answer.data);
      }),
      catchError(error => Observable.throw(error))
    );
  }

}
