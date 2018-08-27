import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { ApiMarvelService } from '../core/api-marvel.service';
import {
  MarvelElement,
  MarvelHero,
  TableData,
  MarvelAnswer,
  TableConfig,
  PagTable
} from '../common';

@Component({
  selector: 'afe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  private static ERROR_MSG_HERO = 'Error obtaining the hero details';
  private static ERROR_MSG_COMICS = 'Error obtaining the list of comics';
  private static ERROR_MSG_STORIES = 'Error obtaining the list of stories';

  public hero$: Observable<MarvelHero>;
  public loading = 0;
  public errorMsg: string = null;

  public titleHero = '';
  public titleComics = 'Comics';
  public titleStories = 'Stories';
  public configElements: TableConfig;
  public comics$: Observable<TableData>;
  public stories$: Observable<TableData>;

  constructor(
    private _route: ActivatedRoute,
    private _apiMarvel: ApiMarvelService
  ) {}

  ngOnInit() {
    this.configElements = {
      id: 'id',
      sizes: [5, 10, 20],
      rowsConfig: [
        { title: 'Title', value: 'title' },
        { title: 'Description', value: 'description' }
      ]
    };
    this.loading = 3;
    const heroId = this._route.snapshot.params.hero;
    this.hero$ = this._apiMarvel.getDetailsHero(heroId)
    .pipe(
      map((answer: MarvelAnswer) => {
        --this.loading;
        this.titleHero = (answer.result[0] as MarvelHero).name;
        return (answer.result[0] as MarvelHero);
      }),
      catchError((error: Error) => {
        --this.loading;
        return this._detailsError(error, DetailComponent.ERROR_MSG_HERO);
      })
    );

    this.comics$ = this._apiMarvel.getListComics(heroId, 5, 0)
    .pipe(
      map((answer: MarvelAnswer) => {
        --this.loading;
        return this._getTableData(answer);
      }),
      catchError((error: any) => {
        --this.loading;
        return this._detailsError(error, DetailComponent.ERROR_MSG_COMICS);
      })
    );

    this.stories$ = this._apiMarvel.getListSeries(heroId, 5, 0)
    .pipe(
      map((answer: MarvelAnswer) => {
        --this.loading;
        return this._getTableData(answer);
      }),
      catchError((error: any) => {
        --this.loading;
        return this._detailsError(error, DetailComponent.ERROR_MSG_STORIES);
      })
    );
  }

  private _detailsError (error: any, message: string): Observable<any> {
    this.errorMsg = message;
    return throwError(error);
  }

  private _getTableData ( answer: MarvelAnswer): TableData {
    const currentPage = Math.ceil(answer.offset / answer.limit);
    const currentLimit = answer.limit;
    const lastPage = Math.ceil(answer.total / answer.limit);

    return {
      currentPage: currentPage,
      currentLimit: currentLimit,
      lastPage: lastPage,
      data: (answer.result as MarvelElement []).map((element: MarvelElement) => {
        element.description = (element.description) ? element.description.substr(0, 100) : '';
        return element;
      })
    };
  }

  public newPage(table: 'comics' | 'stories', page?: PagTable ) {
    this.loading++;
    const realLimit = (page) ? page.limit : 5;
    const realPage = (page) ? page.page : 0;
    const offset = realLimit * realPage;
    const heroId = this._route.snapshot.params.hero;

    switch (table) {
      case 'comics':
        this.comics$ = this._apiMarvel.getListComics(heroId, realLimit, offset)
        .pipe(
          map((answer: MarvelAnswer) => {
            --this.loading;
            return this._getTableData(answer);
          }),
          catchError((error: any) => {
            --this.loading;
            return this._detailsError(error, DetailComponent.ERROR_MSG_COMICS);
          })
        );
        break;
      case 'stories':
        this.stories$ = this._apiMarvel.getListSeries(heroId, realLimit, offset)
        .pipe(
          map((answer: MarvelAnswer) => {
            --this.loading;
            return this._getTableData(answer);
          }),
          catchError((error: any) => {
            --this.loading;
            return this._detailsError(error, DetailComponent.ERROR_MSG_STORIES);
          })
        );
        break;
    }
  }
}
