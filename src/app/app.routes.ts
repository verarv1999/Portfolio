// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent }     from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent }  from './pages/contact/contact';

export const routes: Routes = [
  { path: '',         component: HomeComponent,     title: 'Inicio | Portfolio' },
  { path: 'projects', component: ProjectsComponent, title: 'Proyectos | Portfolio' },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then(m => m.AboutComponent), // <-- ajusta aquí si tu archivo es about.component.ts
    title: 'Sobre mí | Portfolio'
  },
  { path: 'contact',  component: ContactComponent,  title: 'Contacto | Portfolio' },
  { path: '**', redirectTo: '' },
];
