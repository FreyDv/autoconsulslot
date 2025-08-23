import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersNameScene } from './users-name.scene';
import { UserRepositoryModule } from '../repo/usr-repo/user-repository.module';

@Module({
  imports:[UserRepositoryModule],
  providers: [UsersService],
  controllers: [UsersNameScene],
  exports: [UsersService],
})
export class UsersModule {}
