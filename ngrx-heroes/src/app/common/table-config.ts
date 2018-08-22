export interface RowConfig {
  title: string;
  value: string;
}

export interface TableConfig {
  sizes: number[];
  rowsConfig: RowConfig[];
}
