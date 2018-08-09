import { MarvelElement } from './marvel-element';
import { MarvelHero } from './marvel-hero';

export interface MarvelAnswer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  result: MarvelElement[] | MarvelHero[];
}
