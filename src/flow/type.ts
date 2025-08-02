import { services } from '@modules/player-write/service';

export enum Step {
  Loading,
  EmptyPage,
  InitialPage,
  ChoseAuthMethod,
  FileKey,
  UserHomePage,
  Visit,
  ApplicantInfo,
  Location,
  ApplicantPersonDetermination,
  DateSelector,
  Unknown,
}

type Male = true;
type FeMale = false;
export type Gender = Male | FeMale;
export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export type Year = string;
export type Day =
  '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31';


export interface Dependent {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface ApplicantInfo {
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