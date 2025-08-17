import { Day, Dependent, Gender, Month, Year } from "src/flow/type";
import { services } from "../player-write/service";

export class User {
  id: string;
  isWomen: Gender;
  service: typeof services[number];
  fileName: string;
  password: string;
  day: Day;
  monthOrderNumber: Month;
  year: Year;
  location: string;
  institution: string;
  visitForApplicant: boolean;
  dependents?: Dependent[];
}