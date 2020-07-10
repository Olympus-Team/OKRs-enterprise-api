import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '@app/modules/user/user.service';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';
import { AuthResponse } from '../auth.interface';
import { Connection } from 'typeorm';
import { DatabaseConnectionService } from '@app/db/database-connetion.service';
import { defaultJwtModuleOption } from '@app/constants/app.config';
import { UserRepository } from '@app/modules/user/user.repository';
import { UserEntity } from '@app/db/entities/user.entity';

describe('RoleController', () => {
  let jwtOption: JwtModuleOptions;
  let connection: Connection;
  let userRepository: UserRepository;
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  beforeEach(() => {
    jwtOption = {
      secret: defaultJwtModuleOption.secret,
      signOptions: {
        expiresIn: defaultJwtModuleOption.expiresIn,
      },
    };
    jwtService = new JwtService(jwtOption);
    connection = new Connection(DatabaseConnectionService.postgresOrmOptions());
    console.log(connection);
    userRepository = connection.getCustomRepository(UserRepository);
    userService = new UserService(connection, userRepository);
    authService = new AuthService(userService, jwtService);
    authController = new AuthController(authService, userService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  describe('Register An User', () => {
    it('Should return a new token', async () => {
      const result: Promise<AuthResponse> = null;
      jest.spyOn(authService, 'authenticate').mockImplementation(() => result);
      const createRole = await authController.register({ email: 'test@gmail.com', password: 'hello' });
      expect(createRole).toBe(result);
    });
  });
});
