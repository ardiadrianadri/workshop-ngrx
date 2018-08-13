import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiMarvelService } from '../core/api-marvel.service';
import { MarvelAnswer, TableConfig, MarvelElement, MarvelHero } from '../common';


@Component({
  selector: 'afe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public herosList$: Observable<MarvelAnswer>;
  public tableSearchConfig: TableConfig = [
    { title: 'Name', value: 'name' },
    { title: 'Description', value: 'description' }
  ];

  constructor (
    private _marvelApi: ApiMarvelService
  ) {}

  public onSearch(superHeroName: string) {
    this.herosList$ = this._marvelApi.getListHeroes(superHeroName, 30, 0)
    .pipe(
      map((answer: MarvelAnswer) => {
        const len = answer.result.length;

        for (let i = 0; i < len; i++) {
          answer.result[i].description = answer.result[i].description.substr(0, 100);
        }

        return answer;
      })
    );
  }
}
