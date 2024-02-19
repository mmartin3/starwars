import { Person } from "./person.model";

export interface People {
  count: number;
  next: string|null;
  previous: string|null;
  results: Person[];
}