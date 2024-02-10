import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshtaComponent } from './ishta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IshtaComponent', () => {
  let component: IshtaComponent;
  let fixture: ComponentFixture<IshtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshtaComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IshtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
