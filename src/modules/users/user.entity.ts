import { Day, Dependent, Gender, Month, Year } from 'src/flow/type';
import { services } from '../player-write/service';
import * as fs from 'node:fs';

export class User {
  private id: string;
  private isWomen: Gender;
  private service: typeof services[number];
  private fileName: string;
  private password: string;
  private day: Day;
  private monthOrderNumber: Month;
  private year: Year;
  private location: string;
  private institution: string;
  private visitForApplicant: boolean;
  private dependents?: Dependent[];
  private _name: string

  constructor(id: string) {
    this.id = id;
  }

  set name(name: string) {

    if (this.name.length === 0) {
      throw new Error("User Name is empty")




    }
    this._name = name;
  }


  static fromPrimitive(primitiveUSer: string): User {
    const plainUser = JSON.parse(primitiveUSer)

    plainUser.id

    const user =  User.apply( plainUser.id )

    return user
  }

  toPrimitive(): string{
    return JSON.stringify(this)
  }
}



const fileContent = fs.readFileSync('134352436547658674632453647u.json', 'utf8', (err, data) => {})

const user = User.fromPrimitive(fileContent)

user.name ="ASDFSGDHFJGK";


const json = user.toPrimitive()


const fileContent = fs.appendFile('134352436547658674632453647u.json', json)

134352436547658674632453647u.json


