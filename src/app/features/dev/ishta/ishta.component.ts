import { Component, OnDestroy, OnInit } from '@angular/core';
import { IshtaService } from '../services/ishta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-ishta',
  standalone: true,
  imports: [],
  templateUrl: './ishta.component.html',
  styleUrl: './ishta.component.scss',
})
export class IshtaComponent implements OnInit, OnDestroy {
  constructor(private service: IshtaService) {}

  testWelcome: string = 'Error: Text not found';
  testInternet: string = 'Error: Cant connect to httpbin.org/get';
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  ngOnInit(): void {
    this.service.testApiWelcome().subscribe({
      next: (reponse: string) => {
        this.testWelcome = reponse;
      },
    });

    this.service.testInternet().subscribe({
      next: (reponse) => {
        if (reponse.status === 200) {
          this.testInternet = 'Connexion à httpbin.org/get OK';
        }
      },
    });

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
