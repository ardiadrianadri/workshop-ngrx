import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'afe-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})

export class ErrorMsgComponent {

  public errorMsg: string = null;

  @Input()
  public get msg(): string {
    return this.errorMsg;
  }

  @Output()
  public msgChange: EventEmitter<string> = new EventEmitter<string>();

  public set msg(alert: string) {
    this.errorMsg = alert;
    this.msgChange.emit(alert);
  }
}
