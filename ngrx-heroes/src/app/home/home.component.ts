import { Component } from '@angular/core';

@Component({
  selector: 'afe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public onSearch(superHeroName: string) {
    console.log(superHeroName);
  }
}
