import path from 'path';
import fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository{
  private readonly filePath = path.join(__dirname, 'users.json');


  readUsers(id: string): string {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  saveUsers(users: string) {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }
}