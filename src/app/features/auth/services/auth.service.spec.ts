import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { ModifyUserRequest } from '../interfaces/modifyUserRequest';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const registerRequest: RegisterRequest = {
    email: 'scp999@scpfondation.fr',
    name: 'TickleMonster',
    password: 'I tickle monsters 999 !',
  };

  const modifyUserRequest: ModifyUserRequest = {
    email: 'scp999@scpfondation.fr',
    name: 'TickleMonster',
    oldPassword: 'I dont like tickling monsters 101 ?',
    password: 'I tickle monsters 999 !',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('register should call Api', () => {
    //Given

    //When
    service.register(registerRequest).subscribe();

    //Then
    const req = httpTestingController.expectOne(
      service['pathService'] + '/register'
    );
    expect(req.request.method).toEqual('POST');
    httpTestingController.verify();
  });

  it('update should call Api', () => {
    //Given

    //When
    service.update(modifyUserRequest).subscribe();

    //Then
    const req = httpTestingController.expectOne(service['pathService'] + '/me');
    expect(req.request.method).toEqual('PUT');
    httpTestingController.verify();
  });

  it('login should call Api', () => {
    //Given
    const loginRequest: LoginRequest = {
      email: 'test@test.com',
      password: 'password',
    };

    //When
    service.login(loginRequest).subscribe();

    //Then
    const req = httpTestingController.expectOne(
      service['pathService'] + '/login'
    );
    expect(req.request.method).toEqual('POST');
    httpTestingController.verify();
  });
});
