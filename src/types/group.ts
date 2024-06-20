import { Item } from "./item";

export interface Group {
  group: string;
  index: number;
  key: number;
  options: Item[];
}
