import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from './services/session.service';
import { AuthService } from './features/auth/services/auth.service';
import { of, throwError } from 'rxjs';
import { User } from './interfaces/user.interface';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let sessionService: SessionService;

  const mockUser: User = {
    id: 1,
    name: 'Ishta',
    email: 'test@testing.test',
    roles: 'ROLE_USER',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('service islogged should be falsy at start', () => {
    //Given

    //When

    //Then
    expect(app.$isLogged()).not.toBeTruthy;
  });

  it('should autoLog onInit', () => {
    //Given
    let autoLogSpy = jest.spyOn(app, 'autoLog');

    //When
    app.ngOnInit();

    //Then
    expect(autoLogSpy).toHaveBeenCalled;
  });

  it('autoLog should work when user is OK', () => {
    //Given
    let authServiceSpy = jest
      .spyOn(authService, 'me')
      .mockReturnValue(of(mockUser));

    //When
    app.autoLog();

    //Then
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('autoLog should work when user is OK', () => {
    //Given
    let authServiceSpy = jest
      .spyOn(authService, 'me')
      .mockReturnValue(throwError(() => new Error()));

    let sessionServiceSpy = jest.spyOn(sessionService, 'logOut');
    //When
    app.autoLog();

    //Then
    expect(authServiceSpy).toHaveBeenCalled();
    expect(sessionServiceSpy).toHaveBeenCalled();
  });
});
