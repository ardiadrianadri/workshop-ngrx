export interface RowConfig {
  title: string;
  value: string;
}

export interface TableConfig {
  id: string;
  sizes: number[];
  rowsConfig: RowConfig[];
}
