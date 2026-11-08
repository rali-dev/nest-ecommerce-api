import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService]
})
export class UserModule {}
