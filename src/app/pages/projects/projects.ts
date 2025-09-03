import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../../shared/cards/project-card';

type Project = {
  title: string;
  description: string;
  tag?: string;
  tech?: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  gallery?: string[];
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, ProjectCardComponent],
  template: `
    <section class="space-y-10">
      <!-- Cabecera -->
      <header class="space-y-2">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide">
          <span class="h-2 w-2 rounded-full bg-white/80"></span>
          Portfolio · Proyectos
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold">
          Selección de <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">trabajos</span>
        </h2>
        <p class="text-neutral-300 max-w-2xl">
          Android, Web y automatización — foco en rendimiento, UX y código limpio.
        </p>
      </header>

      <!-- Hero destacado -->
      <section class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div class="grid gap-6 md:grid-cols-2 p-6 md:p-8">
          <div class="space-y-3">
            <span class="inline-block text-xs px-3 py-1 rounded-full border border-white/10 bg-white/10">
              {{ featured?.tag || 'Proyecto' }}
            </span>
            <h3 class="text-2xl md:text-3xl font-bold leading-tight">
              {{ featured?.title }}
            </h3>
            <p class="text-neutral-300">
              {{ featured?.description }}
            </p>

            <ul class="flex flex-wrap gap-2 pt-2">
              <li *ngFor="let t of (featured?.tech || [])"
                  class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">
                {{ t }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-3 pt-4">
              <a *ngIf="featured?.demoUrl" [href]="featured?.demoUrl" target="_blank" rel="noopener"
                 class="px-4 py-2 rounded-xl bg-white text-neutral-900 font-semibold hover:opacity-90">
                Ver demo
              </a>
              <a *ngIf="featured?.repoUrl" [href]="featured?.repoUrl" target="_blank" rel="noopener"
                 class="px-4 py-2 rounded-xl border border-white/20 hover:border-white/40">
                 Ver en GitHub ↗
              </a>
            </div>
          </div>

          <!-- Imagen del hero (más contenida) -->
          <div class="relative flex items-center justify-center p-4">
            <div class="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/10 to-transparent blur-2xl"></div>
            <img
              [src]="featured?.imageUrl || '/assets/projects/placeholder.png'"
              [alt]="featured?.title || 'Proyecto destacado'"
              class="relative aspect-square w-full max-w-[280px] md:max-w-[360px] object-contain rounded-2xl border border-white/10 bg-black/20"
            />
          </div>
        </div>
      </section>

      <!-- Chips decorativos -->
      <nav class="flex flex-wrap gap-2">
        <button class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Todos</button>
        <button class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Android</button>
        <button class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Web</button>
        <button class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Automatización</button>
      </nav>

      <!-- Grid (resto) -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ng-container *ngFor="let p of others">
          <div class="space-y-2">
            <app-project-card
              [title]="p.title"
              [description]="p.description"
              [tag]="p.tag"
              [tech]="p.tech || []"
              [imageUrl]="p.imageUrl"
              [demoUrl]="p.demoUrl"
              [repoUrl]="p.repoUrl"
              [gallery]="p.gallery"
              class="rounded-2xl"
            ></app-project-card>

            <!-- Enlace explícito bajo cada tarjeta -->
            <a *ngIf="p.repoUrl" [href]="p.repoUrl" target="_blank" rel="noopener"
               class="inline-flex items-center gap-1 text-sm text-neutral-200 hover:opacity-90">
              Ver en GitHub ↗
            </a>
          </div>
        </ng-container>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio (Angular)',
      description: 'Web personal con Angular + Tailwind. Rutas standalone, diseño responsive y buen rendimiento.',
      tag: 'Web',
      tech: ['Angular', 'Tailwind'],
      imageUrl: '/assets/projects/ic_angular.png'
      // repoUrl: 'https://github.com/verarv1999/portfolio' // ← lo añades cuando lo subas
    },
    {
      title: 'FinanPie',
      description: 'App de ahorro personal: metas, ingresos/gastos y seguimiento sencillo desde el móvil.',
      tag: 'Android',
      tech: ['Kotlin', 'Firebase', 'Material Design'],
      imageUrl: '/assets/projects/ic_finanpie.png',
      repoUrl: 'https://github.com/verarv1999/FinanPie'
    },
    {
      title: 'MovieLibrary',
      description: 'Catálogo de películas con búsqueda, favoritos y ficha detallada. Integración con API pública.',
      tag: 'Web',
      tech: ['Angular', 'RxJS', 'REST API'],
      imageUrl: '/assets/projects/movie.png',
      repoUrl: 'https://github.com/verarv1999/Movie_library'
    },
    {
      title: 'Chatbot WhatsApp',
      description: 'Bot para la Feria de los Pueblos: horarios, agenda y geolocalización de casetas.',
      tag: 'Automatización',
      tech: ['Node.js', 'WhatsApp Cloud API', 'Express'],
      imageUrl: '/assets/projects/whatsapp.png'
      // repoUrl: 'https://github.com/verarv1999/chatbot-whatsapp'
    }
  ];

  featured?: Project;
  others: Project[] = [];

  constructor() {
    // Destacado: Portfolio. Cambia el orden si quieres destacar otro.
    this.featured = this.projects[0];
    this.others = this.projects.slice(1);
  }
}
