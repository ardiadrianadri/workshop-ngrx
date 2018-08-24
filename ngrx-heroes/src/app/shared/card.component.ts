import { Component, Input } from '@angular/core';

@Component({
  selector: 'afe-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input()
  public title = '';
}
