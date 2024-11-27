import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BookGridComponent } from './components/book-grid/book-grid.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Route[] = [
  {
    path: '',
    component: HeaderComponent,
    children: [{ path: '', component: BookGridComponent }],
  },
  { path: 'auth', component: AuthComponent },
];
