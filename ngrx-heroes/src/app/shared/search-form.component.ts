import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'afe-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent {

  public name = '';

  @Output()
  public superHeroName: EventEmitter<string> = new EventEmitter<string>();

  public onSubmit(event: Event) {
    this.superHeroName.emit(event.target[0].value);
  }
}
