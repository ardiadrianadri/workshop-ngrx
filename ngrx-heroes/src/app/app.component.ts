import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'afe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _router: Router) {}

  public goHome() {
    this._router.navigate(['home']);
  }
}
