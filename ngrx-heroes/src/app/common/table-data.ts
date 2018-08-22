import { MarvelElement } from './marvel-element';
import { MarvelHero } from './marvel-hero';

export interface TableData {
  currentPage: number;
  currentLimit: number;
  lastPage: number;
  data: MarvelElement[] | MarvelHero [];
}
