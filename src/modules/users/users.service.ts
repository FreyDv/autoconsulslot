import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly filePath = path.join(__dirname, 'users.json');

  private readUsers(): User[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private saveUsers(users: User[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }

  create(userData: User): User {
    return userData
  }

  update(id: number, userData: Partial<User>): User {
    return userData as User;
  }

  delete(id: number) {
    console.log(id)
  }
}
