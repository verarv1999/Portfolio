import {
  Component, Input, signal, HostListener, ViewChild, ElementRef,
  OnDestroy, inject
} from '@angular/core';
import { NgIf, NgFor, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, NgFor],
  host: { class: 'block h-full' },
  template: `
    <article
      class="group h-full rounded-2xl overflow-hidden border border-white/10
             bg-neutral-900/30 hover:border-white/30 transition shadow-sm flex flex-col cursor-pointer"
      (click)="onCardClick()"
      tabindex="0"
      aria-label="{{ title }}">

      <!-- Imagen + overlay solo si hay imagen -->
      <div class="relative">
        <img *ngIf="imageUrl" [src]="imageUrl" [alt]="title"
             class="block w-full h-full object-cover transition duration-300
                    group-hover:scale-[1.03] group-focus-within:scale-[1.03]" loading="lazy" />

        <!-- Overlay indicativo SOLO si hay galería -->
        <div *ngIf="gallery?.length"
             class="pointer-events-none absolute inset-0 flex items-center justify-center
                    bg-black/0 opacity-0 transition
                    group-hover:bg-black/55 group-hover:opacity-100
                    group-focus-within:bg-black/55 group-focus-within:opacity-100">
          <span class="inline-flex items-center gap-2 text-white text-sm font-medium
                       bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
            📷 Ver fotos
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-3">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-lg font-semibold leading-tight">{{ title }}</h3>
          <span *ngIf="tag"
                class="text-[11px] px-2 py-1 rounded-full border border-white/10 text-neutral-300 whitespace-nowrap">
            {{ tag }}
          </span>
        </div>

        <p class="text-sm text-neutral-300">{{ description }}</p>

        <ul *ngIf="tech?.length" class="mt-1 flex flex-wrap gap-1.5">
          <li *ngFor="let t of tech"
              class="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            {{ t }}
          </li>
        </ul>

        <div class="mt-3 flex gap-3 text-sm">
          <button *ngIf="demoUrl" (click)="openConfirm(); $event.stopPropagation()"
                  class="underline hover:no-underline">Demo-APK</button>

          <a *ngIf="repoUrl" [href]="repoUrl" target="_blank" rel="noopener"
             (click)="$event.stopPropagation()" class="underline hover:no-underline">Código</a>
        </div>
      </div>
    </article>

    <!-- Modal APK -->
    <div *ngIf="showConfirm()" class="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-black/60" (click)="cancelConfirm()"></div>
      <div class="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-xl">
        <h3 class="text-lg font-semibold mb-2">Descargar APK</h3>
        <p class="text-sm text-neutral-300 mb-6">
          Vas a descargar el archivo <b>.apk</b> desde GitHub Releases.<br>¿Quieres continuar?
        </p>
        <div class="flex gap-3 justify-end">
          <button type="button" class="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10 transition"
                  (click)="cancelConfirm()">Cancelar</button>
          <button type="button" class="rounded-xl bg-white/90 text-black px-4 py-2 hover:bg-white transition"
                  (click)="confirmDownload()">Sí, descargar</button>
        </div>
      </div>
    </div>

    <!-- GALERÍA -->
    <div *ngIf="showGallery()" class="fixed inset-0 z-[90] flex items-center justify-center" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-black/80" (click)="closeGallery()"></div>

      <div class="relative mx-4 w-full max-w-6xl">
        <button class="absolute -top-10 right-0 md:top-0 md:-right-10 rounded-xl border border-white/20 px-3 py-2
                       bg-neutral-900/60 hover:bg-neutral-800"
                (click)="closeGallery()" aria-label="Cerrar galería">✕</button>

        <button class="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70
                       border border-white/20 p-3 hover:bg-neutral-800 z-[100]"
                (click)="scrollGallery('left')" aria-label="Anterior">‹</button>

        <button class="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70
                       border border-white/20 p-3 hover:bg-neutral-800 z-[100]"
                (click)="scrollGallery('right')" aria-label="Siguiente">›</button>

        <div #galleryContainer
             class="flex overflow-x-auto gap-6 snap-x snap-mandatory p-4 rounded-2xl border border-white/10
                    bg-neutral-900/60 scroll-smooth overscroll-contain touch-pan-x"
             style="scrollbar-width: thin;">
          <figure *ngFor="let img of gallery" class="flex-none snap-center">
            <img [src]="img" class="h-[80vh] w-auto object-contain select-none"
                 [alt]="title + ' screenshot'" loading="lazy" />
          </figure>
        </div>
      </div>
    </div>
  `,
})
export class ProjectCardComponent implements OnDestroy {
  @Input() title = '';
  @Input() description = '';
  @Input() tag?: string;
  @Input() tech: string[] = [];
  @Input() imageUrl?: string;
  @Input() demoUrl?: string;
  @Input() repoUrl?: string;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private document = inject(DOCUMENT);

  private _gallery: string[] = [];
  @Input() set gallery(value: string[] | undefined) { this._gallery = value ?? []; }
  get gallery(): string[] { return this._gallery; }

  showConfirm = signal(false);
  showGallery = signal(false);

  @ViewChild('galleryContainer') galleryContainer?: ElementRef<HTMLDivElement>;
  private winWheelHandler?: (e: WheelEvent) => void;

  onCardClick() {
    if (this.gallery?.length) this.openGallery();
  }

  openGallery() {
    this.showGallery.set(true);
    if (this.isBrowser) {
      this.document.body.classList.add('overflow-hidden');
      if (!this.winWheelHandler) {
        this.winWheelHandler = (e: WheelEvent) => {
          if (!this.showGallery()) return;
          const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          if (delta === 0) return;
          e.preventDefault();
          e.stopPropagation();
          const el = this.galleryContainer?.nativeElement;
          if (el) el.scrollLeft += delta;
        };
        window.addEventListener('wheel', this.winWheelHandler, { passive: false });
      }
    }
  }

  closeGallery() {
    this.showGallery.set(false);
    if (this.isBrowser) {
      this.document.body.classList.remove('overflow-hidden');
    }
  }

  scrollGallery(dir: 'left' | 'right') {
    if (!this.isBrowser) return;
    const el = this.galleryContainer?.nativeElement; if (!el) return;
    const amt = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' });
  }

  openConfirm() { this.showConfirm.set(true); }
  confirmDownload() { if (this.demoUrl && this.isBrowser) window.open(this.demoUrl, '_blank', 'noopener'); this.cancelConfirm(); }
  cancelConfirm() { this.showConfirm.set(false); }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showGallery()) this.closeGallery();
    if (this.showConfirm()) this.cancelConfirm();
  }

  ngOnDestroy() { this.detachGlobalWheel(); }
  private detachGlobalWheel() {
    if (this.winWheelHandler && this.isBrowser) {
      window.removeEventListener('wheel', this.winWheelHandler as EventListener);
      this.winWheelHandler = undefined;
    }
  }
}
