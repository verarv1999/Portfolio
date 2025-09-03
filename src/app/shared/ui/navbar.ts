import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgIf, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

type NavItem = { label: string; path: string; exact?: boolean };

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
  template: `
    <header class="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-neutral-950/70">
      <nav class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a routerLink="/" class="font-bold text-lg tracking-tight">Victor_Vera</a>

        <!-- Botón móvil -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-2"
          (click)="toggleMobile()"
          [attr.aria-expanded]="open()"
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >☰</button>

        <!-- Menú desktop -->
        <ul
          #menu
          class="hidden md:flex gap-2 text-sm relative"
          role="menubar"
          (keydown)="onKeydown($event)"
        >
          <li class="relative" *ngFor="let item of items; let i = index">
            <a
              #linkEl
              role="menuitem"
              [routerLink]="item.path"
              routerLinkActive="text-white bg-white/10"
              #rla="routerLinkActive"
              [routerLinkActiveOptions]="{ exact: !!item.exact }"
              [attr.aria-current]="rla.isActive ? 'page' : null"
              class="px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition"
              (isActiveChange)="onActiveChange(i, $event)"
            >
              {{ item.label }}
            </a>
          </li>

          <!-- Indicador deslizante -->
          <span
            class="pointer-events-none absolute -bottom-[4px] hidden md:block h-[3px] rounded-[100px] bg-white/80 transition-all duration-300"
            [style.transform]="'translateX(' + indicatorLeft + 'px)'"
            [style.width.px]="indicatorWidth"
            [style.opacity]="indicatorVisible ? 1 : 0"
          ></span>
        </ul>
      </nav>

      <!-- Menú mobile -->
      <div *ngIf="open()" id="mobile-menu" class="md:hidden border-t border-white/10">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3 space-y-2">
          <a
            *ngFor="let item of items"
            [routerLink]="item.path"
            routerLinkActive="text-white font-semibold"
            [routerLinkActiveOptions]="{ exact: !!item.exact }"
            #rlaMob="routerLinkActive"
            [attr.aria-current]="rlaMob.isActive ? 'page' : null"
            (click)="open.set(false)"
            class="block rounded-lg px-3 py-2 text-neutral-300 hover:text-white hover:bg-white/10 transition"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  open = signal(false);

  items: NavItem[] = [
    { label: 'Inicio', path: '/', exact: true },
    { label: 'Proyectos', path: '/projects' },
    { label: 'Sobre mí', path: '/about' },
    { label: 'Contacto', path: '/contact' },
  ];

  @ViewChild('menu') menuRef!: ElementRef<HTMLUListElement>;
  @ViewChildren('linkEl') linkEls!: QueryList<ElementRef<HTMLAnchorElement>>;

  indicatorLeft = 0;
  indicatorWidth = 0;
  indicatorVisible = false;

  private sub?: Subscription;
  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId); 
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; 

    queueMicrotask(() => this.moveIndicatorToActive());

    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.open.set(false);
        requestAnimationFrame(() => this.moveIndicatorToActive());
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    requestAnimationFrame(() => this.moveIndicatorToActive());
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.isBrowser) return;
    if (!this.open()) return;
    const el = this.host.nativeElement as HTMLElement;
    if (!el.contains(ev.target as Node)) this.open.set(false);
  }

  toggleMobile() {
    this.open.set(!this.open());
  }

  onKeydown(ev: KeyboardEvent) {
    if (!this.isBrowser) return;
    if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
    ev.preventDefault();
    const links = this.linkEls?.toArray().map(r => r.nativeElement) ?? [];
    if (!links.length) return;

    const activeIdx = Math.max(
      0,
      this.items.findIndex(i => this.router.isActive(i.path, i.exact ?? false))
    );
    const next =
      ev.key === 'ArrowRight'
        ? (activeIdx + 1) % links.length
        : (activeIdx - 1 + links.length) % links.length;
    links[next]?.focus();
  }

  onActiveChange(index: number, active: boolean) {
    if (!this.isBrowser) return;
    if (active) this.moveIndicatorToIndex(index);
  }

  private moveIndicatorToActive() {
    if (!this.isBrowser) return;

    const idx = this.items.findIndex(i => this.router.isActive(i.path, i.exact ?? false));
    if (idx >= 0) this.moveIndicatorToIndex(idx);
    else this.indicatorVisible = false;
  }

  private moveIndicatorToIndex(index: number) {
    if (!this.isBrowser) return;

    const menuEl = this.menuRef?.nativeElement as unknown;
    const link = this.linkEls?.get(index)?.nativeElement;

    if (!menuEl || !link) return;
    const hasGBCR = typeof (menuEl as any).getBoundingClientRect === 'function';
    if (!hasGBCR) return;

    const menuRect = (menuEl as HTMLElement).getBoundingClientRect();
    const rect = link.getBoundingClientRect();

    this.indicatorLeft = rect.left - menuRect.left + 8;
    this.indicatorWidth = Math.max(0, rect.width - 16);
    this.indicatorVisible = true;
  }
}
