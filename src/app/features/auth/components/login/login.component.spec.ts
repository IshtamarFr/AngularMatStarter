import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';
import { User } from '../../../../interfaces/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const mockAuthSuccess: AuthSuccess = {
    token: 'azertyuiop',
  };

  const mockUser: User = {
    id: 1,
    name: 'Ishta',
    email: 'test@testing.test',
    roles: 'ROLE_USER',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit should call service', () => {
    //Given
    let authServiceSpyLogin = jest
      .spyOn(authService, 'login')
      .mockReturnValue(of(mockAuthSuccess));

    let authServiceSpyMe = jest
      .spyOn(authService, 'me')
      .mockReturnValue(of(mockUser));

    //When
    component.submit();

    //Then
    expect(authServiceSpyLogin).toHaveBeenCalled();
    expect(authServiceSpyMe).toHaveBeenCalled();
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
});
