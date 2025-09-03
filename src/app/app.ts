import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar';
import { FooterComponent } from './shared/ui/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-dvh flex flex-col">
      <app-navbar></app-navbar>
      <main class="flex-1">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {}

export { AppComponent as App };
