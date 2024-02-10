import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MeComponent } from '../auth/components/me/me.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'me', component: MeComponent },
];
