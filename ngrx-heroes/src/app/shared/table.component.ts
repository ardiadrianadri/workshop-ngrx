import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { TableConfig, PagTable, TableData } from '../common';

@Component({
  selector: 'afe-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input()
  public tableConfig: TableConfig;

  @Input()
  public tableData: TableData;

  @Output()
  public pagTable: EventEmitter<PagTable> = new EventEmitter<PagTable>();

  public configLeng: number;
  public cursorOnRow = -1;

  ngOnInit() {
    this.configLeng = this.tableConfig.rowsConfig.length;
  }

  public requestNewPage (limit: number, page: number) {
    const realPage = (page < 0)
    ? 0 :
    (page >= this.tableData.lastPage)
    ? this.tableData.lastPage - 1 :
    page;

    this.pagTable.emit({
      page: realPage,
      limit: limit
    });
  }
}
