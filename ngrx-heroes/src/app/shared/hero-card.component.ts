import { Component, Input } from '@angular/core';

import { MarvelHero } from '../common';

@Component({
  selector: 'afe-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})

export class HeroCardComponent {
  @Input()
  public hero: MarvelHero;
}
