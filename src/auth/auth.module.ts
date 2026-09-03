import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

const JWT_SECRET='jwt-secret';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
            JwtModule.register({
              global:true,
              secret:JWT_SECRET,
              signOptions:{expiresIn:'1d'}
            })
  ]
})
export class AuthModule {}