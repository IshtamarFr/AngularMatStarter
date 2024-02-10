import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    NgTemplateOutlet,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private ngZone: NgZone
  ) {}

  screenWidth: number = window.innerWidth;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  user?: User;

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.screenWidth = window.innerWidth;
    });
    this.user = this.sessionService.user;
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }
}
