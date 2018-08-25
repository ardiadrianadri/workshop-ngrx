import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiMarvelService } from '../core/api-marvel.service';
import { MarvelElement, MarvelHero, TableData, MarvelAnswer } from '../common';

@Component({
  selector: 'afe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  public hero$: Observable<MarvelHero>;
  public loading = 0;
  public errorMsg: string = null;

  public titleHero = '';
  public titleComics = 'Comics';
  public titleStories = 'Stories';

  constructor(
    private _route: ActivatedRoute,
    private _apiMarvel: ApiMarvelService
  ) {}

  ngOnInit() {
    this.loading ++;
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
        this.errorMsg = 'Error obtaining the hero details';
        return Observable.throw(error);
      })
    );
  }
}
