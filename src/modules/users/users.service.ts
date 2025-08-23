import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from '../repo/usr-repo/user-service';

@Injectable()
export class UsersService {

  constructor(private readonly usersService: UserRepository) {}

  saveUser(userData: User): User {
    return userData
  }

  getUserById(id: string): User {
     const  rawUser= this.usersService.readUsers(id)

    return User.fromPrimitive(rawUser)
  }

  delete(id: number) {
    console.log(id)
  }
}


new Error(",zdjfhbgaeojbvaefouybvfadb")


controller

try {

}chetch(err){
  err.
}

