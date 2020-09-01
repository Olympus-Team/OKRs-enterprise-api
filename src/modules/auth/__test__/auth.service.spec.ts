import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { SignInDTO, RegisterDTO } from '../auth.dto';
import { PASSWORD_WRONG, EMAIL_NOT_FOUND } from '@app/constants/app.exeption';

describe('AuthController', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  let userToken: string;
  let inviteToken: string;

  describe('LOGIN', () => {
    const loginData: SignInDTO = {
      email: 'ducpvse05320@fpt.edu.vn',
      password: 'Admin123',
    };
    const loginWrongEmail: SignInDTO = {
      email: 'ducpvse0532011111@fpt.edu.vn',
      password: 'Admin123',
    };
    const loginWrongPass: SignInDTO = {
      email: 'ducpvse05320@fpt.edu.vn',
      password: 'Admin123123',
    };
    test('(GET) Test wrong path url api login', async () => {
      return request(app.getHttpServer()).get('/api/v1/auth/login').expect(404);
    });

    test('(POST) Login succes', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginData)
        .expect((res) => {
          userToken = res.body.data.token;
          expect(res.body.data).toBeDefined();
          expect(res.body.data.user).toBeDefined();
          expect(res.body.data.user.email).toEqual(loginData.email);
          expect(res.body.data.token).toBeDefined();
        })
        .expect(201);
    });

    test('(POST) Login email wrong', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginWrongEmail)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.statusCode).toEqual(EMAIL_NOT_FOUND.statusCode);
          expect(res.body.message).toEqual(EMAIL_NOT_FOUND.message);
        })
        .expect(EMAIL_NOT_FOUND.statusCode);
    });

    test('(POST) Login password wrong', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginWrongPass)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.statusCode).toEqual(PASSWORD_WRONG.statusCode);
          expect(res.body.message).toEqual(PASSWORD_WRONG.message);
        })
        .expect(PASSWORD_WRONG.statusCode);
    });
  });

  describe('INVITE_PEOPLE', () => {
    test('(GET) Get link invite', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/link_invite')
        .set('Authorization', `Bearer ${userToken}`)
        .expect((res) => {
          inviteToken = res.body.data.token;
          expect(res.body).toBeDefined();
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('REGISTER', () => {
    const registerToken: RegisterDTO = {
      email: 'string',
      password: 'string',
      fullName: 'string',
      gender: true,
      teamId: 2,
      jobPositionId: 1,
      token: `token`,
    };

    const registerData: RegisterDTO = {
      email: 'string',
      password: 'string',
      fullName: 'string',
      gender: true,
      teamId: 2,
      jobPositionId: 1,
      token: `${inviteToken}`,
    };

    test('(POST) Register with wrong token', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Accept', 'application/json')
        .send(registerToken)
        .expect(HttpStatus.BAD_REQUEST);
    });

    test('(POST) Register with body email wrong', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Accept', 'application/json')
        .send(registerData)
        .expect(HttpStatus.BAD_REQUEST);
    });

    test('(POST) Register with password wrong format', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Accept', 'application/json')
        .send(registerData)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
