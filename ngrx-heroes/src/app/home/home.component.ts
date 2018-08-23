import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiMarvelService } from '../core/api-marvel.service';
import { MarvelAnswer, TableConfig, TableData, MarvelHero, PagTable } from '../common';


@Component({
  selector: 'afe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public herosList$: Observable<TableData>;
  public tableSearchConfig: TableConfig = {
    sizes: [5, 10, 20],
    rowsConfig: [
      { title: 'Name', value: 'name' },
      { title: 'Description', value: 'description' }
    ]
  };

  public loading = false;
  public errorMsg: string = null;

  private _searchName: string;

  constructor (
    private _marvelApi: ApiMarvelService
  ) {}


  private _getTableData ( answer: MarvelAnswer): TableData {
    const currentPage = Math.ceil(answer.offset / answer.limit);
    const currentLimit = answer.limit;
    const lastPage = Math.ceil(answer.total / answer.limit);

    return {
      currentPage: currentPage,
      currentLimit: currentLimit,
      lastPage: lastPage,
      data: (answer.result as MarvelHero []).map((hero: MarvelHero) => {
        hero.description = hero.description.substr(0, 100);
        return hero;
      })
    };
  }

  public onSearch(superHeroName: string, page?: PagTable ) {
    this.loading = true;
    const realLimit = (page) ? page.limit : 5;
    const realPage = (page) ? page.page : 0;
    const offset = realLimit * realPage;
    this._searchName = superHeroName;
    this.herosList$ = this._marvelApi.getListHeroes(this._searchName, realLimit , offset)
    .pipe(
      map((answer: MarvelAnswer) => {
        this.loading = false;
        return this._getTableData(answer);
      }),
      catchError((error: Error) => {
        this.loading = false;
        this.errorMsg = 'The comunication with Marvel services was not possible';
        return Observable.throw(error);
      })
    );
  }

  public requestNewPage(page: PagTable) {
    this.onSearch(this._searchName, page);
  }
}
