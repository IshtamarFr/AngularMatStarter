import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeComponent } from './me.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from '../../../../services/session.service';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';
import { ModifyUserRequest } from '../../interfaces/modifyUserRequest';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let authService: AuthService;
  let router: Router;
  let sessionService: SessionService;

  const mockUser: User = {
    id: 682,
    name: 'HardToDestroy',
    email: 'scp682@site17.scp',
    roles: 'ROLE_USER',
  };

  const mockUser2: User = {
    id: 682,
    name: 'Lala',
    email: 'test@test.com',
    roles: 'ROLE_USER,ROLE_ADMIN',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MeComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    sessionService = TestBed.inject(SessionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get back should call component method', () => {
    //Given
    let componentSpyBack = jest.spyOn(component, 'back');

    //When
    component.back();

    //Then
    expect(componentSpyBack).toBeDefined();
    expect(componentSpyBack).toHaveBeenCalled();
  });

  it('should fill form and component data with user data', () => {
    //Given
    let authServiceSpy = jest
      .spyOn(authService, 'me')
      .mockReturnValue(of(mockUser));

    //When
    component.ngOnInit();

    //Then
    expect(authServiceSpy).toHaveBeenCalled();
    expect(component['user']).toBe(mockUser);
    expect(component['form'].get('name')?.value).toBe('HardToDestroy');
    expect(component['form'].get('email')?.value).toBe('scp682@site17.scp');
    expect(component['form'].get('password')?.value).toBeNull;
  });

  it('should logout if user is invalid onInit', () => {
    //Given
    let authServiceSpy = jest
      .spyOn(authService, 'me')
      .mockReturnValue(throwError(() => new Error()));
    let logoutSpy = jest.spyOn(component, 'logout');

    //When
    component.ngOnInit();

    //Then
    expect(authServiceSpy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('Should logout and return to default route when asked for', () => {
    //Given
    let sessionServiceSpy = jest.spyOn(sessionService, 'logOut');
    let routerSpy = jest.spyOn(router, 'navigate');

    //When
    component.logout();

    //Then
    expect(sessionServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should save changes and navigate to main menu when submit', () => {
    //Given
    const modifyUserRequest: ModifyUserRequest = {
      email: 'test@test.com',
      name: 'Lala',
      oldPassword: 'Aa123456',
      password: '',
    };
    const authSuccess: AuthSuccess = { token: 'azertyuiop' };

    let routerSpy = jest.spyOn(router, 'navigate');
    let authServiceSpyUpdate = jest
      .spyOn(authService, 'update')
      .mockReturnValue(of(authSuccess));

    let authServiceSpyMe = jest
      .spyOn(authService, 'me')
      .mockReturnValue(of(mockUser2));

    //When
    component['form'].setValue({
      email: 'test@test.com',
      name: 'Lala',
      oldPassword: 'Aa123456',
      password: '',
      password2: '',
    });
    component.submit();

    //Then
    expect(authServiceSpyUpdate).toHaveBeenCalledWith(modifyUserRequest);
    expect(authServiceSpyMe).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/main']);
  });

  it('should set onError to true if submitted data is erroneous', () => {
    //Given
    let authServiceSpy = jest
      .spyOn(authService, 'update')
      .mockReturnValue(throwError(() => new Error()));

    //When
    component.submit();

    //Then
    expect(authServiceSpy).toHaveBeenCalled();
    expect(component['onError']).toBe(true);
  });
});
