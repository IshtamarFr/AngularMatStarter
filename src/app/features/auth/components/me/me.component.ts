import { NgIf } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user.interface';
import { SessionService } from '../../../../services/session.service';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';
import { AuthService } from '../../services/auth.service';
import { ModifyUserRequest } from '../../interfaces/modifyUserRequest';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent implements OnInit {
  public user!: User;

  public hide = true;
  public hide2 = true;
  public onError = false;

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('password2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  public form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.email, Validators.maxLength(63)]],
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$)|null'
          ),
        ],
      ],
      password2: [
        '',
        [
          Validators.pattern(
            '(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$)|null'
          ),
        ],
      ],
    },
    { validators: this.checkPasswords }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private ngZone: NgZone
  ) {}

  public ngOnInit(): void {
    this.authService.me().subscribe({
      next: (user: User) => {
        this.user = user;

        this.form.setValue({
          email: this.user.email,
          name: this.user.name,
          oldPassword: '',
          password: '',
          password2: '',
        });
      },
      error: () => {
        this.logout();
      },
    });
  }

  public back() {
    window.history.back();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }

  public submit(): void {
    let temp = this.form.value;
    delete temp.password2;
    const modifyUserRequest = temp as ModifyUserRequest;
    this.authService.update(modifyUserRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
          this.ngZone.run(() => {
            this.router.navigate(['/main']);
          });
        });
      },
      error: () => {
        this.onError = true;
      },
    });
  }
}
