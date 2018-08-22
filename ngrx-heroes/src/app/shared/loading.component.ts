import { Component, Input } from '@angular/core';

@Component({
  selector: 'afe-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent {
  @Input()
  public show = false;
}
