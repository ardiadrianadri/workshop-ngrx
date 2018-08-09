import { MarvelBase } from './marvel-base-element';

export interface MarvelHero extends MarvelBase {
  name: string;
  description: string;
  image: string;
}
