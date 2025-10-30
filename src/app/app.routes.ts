import { Route } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ButtonsComponent } from './pages/buttons.component';
import { CardsComponent } from './pages/cards.component';
import { TablesComponent } from './pages/tables.component';
import { FormsComponent } from './pages/forms.component';
import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
