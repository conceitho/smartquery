export interface fwFormStructViewFields {
  group: string;
  order: string;
  folder: string;
  field: string;
  title: string;
  type: string;
  combobox: string[];
  size: number;
  virtual: boolean;
  protectedData: boolean;
  userField: boolean;
  picture: string;
  canChange: boolean;
  decimal: number;
  description: string;
  required?: boolean;
}
