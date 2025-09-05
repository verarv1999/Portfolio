import {
  Component, Input, Output, EventEmitter, HostListener,
  OnChanges, SimpleChanges, signal
} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lightbox-gallery',
  standalone: true,
  imports: [NgFor],
  template: `
  <div class="fixed inset-0 z-[200] bg-black/90 text-white" role="dialog" aria-modal="true">
    <!-- Top bar -->
    <div class="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
      <span class="text-sm opacity-80">{{ index()+1 }} / {{ images.length }}</span>
      <button (click)="close()" class="rounded-xl border border-white/20 px-3 py-1 hover:bg-white/10">
        Cerrar (Esc)
      </button>
    </div>

    <!-- Arrows -->
    <button (click)="prev()" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 border border-white/20 hover:bg-white/10" aria-label="Anterior">‹</button>
    <button (click)="next()" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 border border-white/20 hover:bg-white/10" aria-label="Siguiente">›</button>

    <!-- Slides -->
    <div class="w-screen h-screen overflow-hidden">
      <div class="h-full flex items-center transition-transform duration-300 ease-out"
           [style.transform]="'translateX(-' + (index()*100) + 'vw)'">
        <div *ngFor="let src of images; let i = index" class="min-w-[100vw] h-full flex items-center justify-center p-4">
          <img [src]="src" [alt]="'Imagen ' + (i+1)" class="max-h-[85vh] w-auto rounded-xl border border-white/10 shadow-2xl object-contain" />
        </div>
      </div>
    </div>
  </div>
  `
})
export class LightboxGalleryComponent implements OnChanges {
  @Input() images: string[] = [];
  @Input() startIndex = 0;
  @Output() closed = new EventEmitter<void>();

  index = signal(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startIndex']) {
      this.index.set(Math.min(Math.max(this.startIndex, 0), Math.max(this.images.length - 1, 0)));
    }
  }

  next() { if (this.images.length) this.index.set((this.index()+1) % this.images.length); }
  prev() { if (this.images.length) this.index.set((this.index()-1+this.images.length) % this.images.length); }
  close() { this.closed.emit(); }

  // Teclas
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowRight') this.next();
    else if (e.key === 'ArrowLeft') this.prev();
  }

  // Gestos (swipe)
  private downX: number | null = null;
  @HostListener('pointerdown', ['$event'])
  onDown(ev: PointerEvent) { this.downX = ev.clientX; }
  @HostListener('pointerup', ['$event'])
  onUp(ev: PointerEvent) {
    if (this.downX == null) return;
    const dx = ev.clientX - this.downX;
    this.downX = null;
    if (Math.abs(dx) > 40) (dx < 0 ? this.next() : this.prev());
  }
}
