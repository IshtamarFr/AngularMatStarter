import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { User } from '../interfaces/user.interface';

describe('SessionService', () => {
  let service: SessionService;

  const mockUser: User = {
    id: 1,
    name: 'Ishta',
    email: 'test@testing.test',
    roles: 'ROLE_USER,ROLE_ADMIN',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service islogged should be falsy at start', () => {
    //Given

    //When

    //Then
    expect(service.$isLogged()).not.toBeTruthy;
  });

  it('logIn should make service islogged to be truthy', () => {
    //Given

    //When
    service.logIn(mockUser);

    //Then
    expect(service.isLogged).toBeTruthy;
  });

  it('logOut should make service islogged to be falsy', () => {
    //Given

    //When
    service.logOut();

    //Then
    expect(service.isLogged).not.toBeTruthy;
  });
});
