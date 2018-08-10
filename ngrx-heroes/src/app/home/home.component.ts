import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiMarvelService } from '../core/api-marvel.service';
import { MarvelAnswer } from '../common';


@Component({
  selector: 'afe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  // public herosList$: Observable<MarvelAnswer>;

  constructor (
    private _marvelApi: ApiMarvelService
  ) {}

  public onSearch(superHeroName: string) {
    this._marvelApi.getListHeroes(superHeroName, 5, 0)
    .subscribe(
      (answer: MarvelAnswer) => { console.log(answer); },
      (error: any) => { console.log(error); }
    );
  }
}
