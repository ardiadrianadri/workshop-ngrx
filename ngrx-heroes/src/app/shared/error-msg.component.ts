import { Component, Input } from '@angular/core';

@Component({
  selector: 'afe-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})

export class ErrorMsgComponent {
  @Input()
  public msg: string = null;
}
