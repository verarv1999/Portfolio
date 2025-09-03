import {
  Component, HostListener, OnDestroy, AfterViewInit, inject
} from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, NgOptimizedImage],
  template: `
  <section class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 space-y-12">
    <!-- Cabecera -->
    <header class="space-y-3">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide">
        <span class="h-2 w-2 rounded-full bg-white/80"></span>
        Sobre mí
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold leading-tight">
        Hola, soy <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Vera</span>
      </h2>
      <p class="text-neutral-300 max-w-3xl">
        Desarrollador <b>Android</b> y <b>web</b>. En Android trabajo con <b>Java/Kotlin</b>; en el front con
        <b>Angular + Tailwind</b>. En el backend uso <b>Node.js + Express</b> y estoy
        <b>aprendiendo Spring Boot</b>. Me gusta construir cosas útiles, rápidas y claras.
      </p>

      <!-- Botón CV -->
      <div class="pt-2">
        <a
          href="assets/navbar/cv.pdf"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
          aria-label="Ver CV en PDF (se abre en una pestaña nueva)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1 7V3.5L19.5 9zM8.75 13H9.5a1.75 1.75 0 0 1 0 3.5H8.75V18H7.5v-5h1.25zm.75 2.5a.75.75 0 0 0 0-1.5H8.75v1.5zM12 13h1.75a1.25 1.25 0 0 1 0 2.5H13v1.5h-1.25zm1.75 1a.25.25 0 0 0 0-.5H13v.5zM17.5 13h-2v5h1.25v-1.75H17a1.25 1.25 0 0 0 0-2.5zm-.5 1a.25.25 0 1 1 0 .5h-.75V14z"/>
          </svg>
          Ver CV (PDF)
        </a>
      </div>
    </header>

    <!-- Doble columna: foto + highlights (contenedor glass) -->
    <section class="relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div class="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>

      <div class="grid gap-10 md:grid-cols-12 items-start">
        <!-- Foto -->
        <aside class="md:col-span-5">
          <div class="relative w-full max-w-md mx-auto">
            <div class="absolute -inset-2 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent opacity-80"></div>
            <img
              ngSrc="/assets/about/shot-4.jpg"
              width="768" height="1024"
              alt="Foto de perfil"
              class="relative rounded-[2rem] border border-white/10 shadow-xl w-full h-auto object-cover aspect-[3/4] select-none"
              priority
            />
            <div class="absolute -bottom-5 left-6 right-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg">
              <p class="text-sm text-neutral-200 text-center">
                <b>Android · Web</b> — Angular · Node/Express · Firebase
              </p>
            </div>
          </div>
        </aside>

        <!-- Texto + quick facts -->
        <article class="md:col-span-7 space-y-6">
          <p>
            He hecho cosas como <b>FinanPie</b> (app de ahorro) y un <b>chatbot de WhatsApp</b> para la Feria de Sevilla y Semana Santa.
            Me fijo en los detalles: estados vacíos, microinteracciones y tiempos de carga.
          </p>

          <!-- Quick facts -->
          <div class="grid sm:grid-cols-3 gap-3">
            <div class="rounded-xl border border-white/10 bg-white/5 p-4">
              <div class="text-xl font-extrabold">Málaga</div>
              <div class="text-xs text-neutral-300">Benalmádena</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-4">
              <div class="text-xl font-extrabold">Full-stack</div>
              <div class="text-xs text-neutral-300">Angular · Node/Express</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-4">
              <div class="text-xl font-extrabold">Android</div>
              <div class="text-xs text-neutral-300">Java/Kotlin · Material</div>
            </div>
          </div>

          <!-- Timeline -->
          <section>
            <h3 class="text-lg font-semibold mb-3">Camino</h3>
            <ol class="relative border-l border-white/10 ml-3 space-y-5">
              <li *ngFor="let m of milestones" class="ml-4">
                <div class="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-white/70"></div>
                <h4 class="font-semibold">{{ m.title }}</h4>
                <p class="text-sm text-neutral-300">{{ m.desc }}</p>
              </li>
            </ol>
          </section>

          <p>
            Fuera del código, deporte y amigos. Me gusta aprender y dejar lo que toco un poco mejor de como me lo encontré.
          </p>
        </article>
      </div>
    </section>

    <!-- HARD SKILLS (conciso por áreas) -->
    <section>
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide mb-3">
        🛠️ Hard skills
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let g of hardSkillGroups" class="rounded-xl border border-white/10 bg-white/5 p-5">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xl">{{ g.icon }}</span>
            <h4 class="font-semibold">{{ g.title }}</h4>
          </div>
          <ul class="flex flex-wrap gap-2">
            <li *ngFor="let s of g.items" class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">{{ s }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SOFT SKILLS (ampliado) -->
    <section>
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide mb-3">
        🤝 Soft skills
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div *ngFor="let s of softSkills" class="rounded-xl border border-white/10 bg-white/5 p-5">
          <div class="font-semibold mb-1">{{ s.title }}</div>
          <p class="text-sm text-neutral-300">{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Mini-galería -->
    <section class="mt-2" *ngIf="images.length">
      <h3 class="text-lg font-semibold mb-3">Instantáneas</h3>
      <div class="flex gap-4 overflow-x-auto no-scrollbar px-1">
        <figure *ngFor="let img of images; let i = index"
                class="shrink-0 cursor-zoom-in"
                (click)="openImage(i)">
          <img
            [ngSrc]="img.src"
            [alt]="img.alt"
            width="640" height="400"
            class="h-44 sm:h-56 w-auto rounded-2xl object-cover border border-white/10"
            loading="lazy" decoding="async" />
          <figcaption class="mt-2 text-xs text-neutral-400 text-center">
            {{ img.caption }}
          </figcaption>
        </figure>
      </div>
    </section>
  </section>

  <!-- Lightbox -->
  <div *ngIf="selectedIndex !== null"
       class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
       (click)="closeImage()"
       aria-label="Imagen ampliada, clic para cerrar">

    <button type="button"
            class="absolute top-4 right-4 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-xl"
            (click)="closeImage(); $event.stopPropagation()"
            aria-label="Cerrar">✕</button>

    <button type="button"
            class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur hidden sm:flex items-center justify-center text-2xl"
            (click)="prev($event)" aria-label="Anterior">‹</button>

    <div class="relative" (click)="$event.stopPropagation()">
      <figure class="inline-block text-center">
        <img
          [src]="images[selectedIndex!].src"
          [alt]="images[selectedIndex!].alt"
          class="max-h-[80vh] max-w-[90vw] w-auto h-auto
                 rounded-2xl border border-white/20 shadow-lg object-contain" />
        <figcaption class="mt-3 text-neutral-300 text-sm">
          {{ images[selectedIndex!].caption }}
        </figcaption>
      </figure>
    </div>

    <button type="button"
            class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur hidden sm:flex items-center justify-center text-2xl"
            (click)="next($event)" aria-label="Siguiente">›</button>
  </div>
  `,
  styles: [`
    .no-scrollbar { scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private documentRef = inject(DOCUMENT);

  ngAfterViewInit(): void {}

  // Lightbox
  selectedIndex: number | null = null;
  openImage(index: number) {
    this.selectedIndex = index;
    if (this.isBrowser) this.documentRef.body.style.overflow = 'hidden';
  }
  closeImage() {
    this.selectedIndex = null;
    if (this.isBrowser) this.documentRef.body.style.overflow = '';
  }
  prev(event?: Event) {
    if (event) event.stopPropagation();
    if (this.selectedIndex === null) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }
  next(event?: Event) {
    if (event) event.stopPropagation();
    if (this.selectedIndex === null) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
  }
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.selectedIndex === null) return;
    if (e.key === 'Escape') this.closeImage();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
  ngOnDestroy(): void {
    if (this.isBrowser) this.documentRef.body.style.overflow = '';
  }

  // --- Contenido ---
  milestones = [
    { title: 'FinanPie', desc: 'App de ahorro: objetivos, gastos/ingresos y metas.' },
    { title: 'Chatbot WhatsApp', desc: 'Feria de Sevilla y Semana Santa: horarios , geolocalización y transporte.' },
    { title: 'Junior Developer (2025)', desc: 'Experiencia real en equipo y producto.' },
  ];

  // Hard skills (por áreas, conciso y veraz) — ahora incluye Python, C# y BBDD relacionales/NoSQL
  hardSkillGroups = [
    {
      icon: '🎨', title: 'Frontend',
      items: ['Angular','TypeScript','JavaScript','HTML5','CSS3/Tailwind','Responsive','Accesibilidad']
    },
    {
      icon: '📱', title: 'Android',
      items: ['Java','Kotlin (en progreso)','Android SDK','XML layouts','Material Design','Firebase (Auth/DB)']
    },
    {
      icon: '🔤', title: 'Lenguajes',
      items: ['Java','Kotlin (en progreso)','JavaScript/TypeScript','Python ','C# (básico)']
    },
    {
      icon: '⚙️', title: 'Backend / API',
      items: ['Node.js','Express','REST','WhatsApp Cloud API','Spring Boot (aprendiendo)']
    },
    {
      icon: '🗄️', title: 'Datos & Cloud',
      items: [
        'Relacionales: MySQL, PostgreSQL, SQLite',
        'NoSQL: MongoDB, Firestore, Realtime DB',
        'Firebase Storage'
      ]
    },
    {
      icon: '🔧', title: 'Herramientas',
      items: ['Git & GitHub','Postman','Figma (wireframes)','CI/CD básico','NPM']
    }
  ];

  // Soft skills (ampliado)
  softSkills = [
    { title: 'Trabajo en equipo', desc: 'Colaboración y feedback constante.' },
    { title: 'Comunicación', desc: 'Explico decisiones técnicas en simple.' },
    { title: 'Resolución de problemas', desc: 'Divido, pruebo, mido y itero.' },
    { title: 'Responsabilidad / Ownership', desc: 'Me hago cargo de punta a punta.' },
    { title: 'Organización', desc: 'Prioridades y tiempos realistas.' },
    { title: 'Aprendizaje continuo', desc: 'Me actualizo y documento.' },
    { title: 'Atención al detalle', desc: 'UX, estados vacíos y accesibilidad.' },
    { title: 'Adaptabilidad', desc: 'Cambio de contexto sin perder calidad.' },
    { title: 'Empatía con el usuario', desc: 'Construyo pensando en casos reales.' }
  ];

  // Galería (2 fotos)
  images = [
    { src: '/assets/about/shot-1.jpg', alt: 'Trabajo y apuntes', caption: 'Un poco de curro' },
    { src: '/assets/about/shot-2.jpg', alt: 'Detalle de proyectos', caption: 'Proyectos y pruebas' }
  ];
}
