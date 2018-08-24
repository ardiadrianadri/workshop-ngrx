import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'afe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Output()
  homeClicked: EventEmitter<any> = new EventEmitter<any>();

  public goHome() {
    this.homeClicked.emit();
  }
}
