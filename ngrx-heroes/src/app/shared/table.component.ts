import {
  Component,
  Input
} from '@angular/core';

import { TableConfig, MarvelAnswer } from '../common';

@Component({
  selector: 'afe-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  @Input()
  tableConfig: TableConfig;

  @Input()
  tableData: MarvelAnswer;

}
