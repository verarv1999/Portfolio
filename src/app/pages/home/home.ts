import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <section class="relative">
      <!-- fondo decorativo -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-white/10"></div>
        <div class="absolute -bottom-32 -right-20 h-80 w-80 rounded-full blur-3xl bg-white/5"></div>
      </div>

      <div class="grid gap-10 md:grid-cols-12 items-center">
        <!-- Imagen / Lateral visual -->
        <div class="md:col-span-5 order-first">
          <div class="relative mx-auto w-full max-w-sm md:max-w-md">
            <div class="absolute -inset-2 rounded-[2rem] bg-gradient-to-b from-white/20 to-white/0 opacity-80"></div>

            <img
              ngSrc="/assets/home/me.webp"
              width="768" height="1152"
              alt="Retrato de bienvenida del portfolio con estilo minimalista"
              class="relative rounded-[2rem] border border-white/10 shadow-xl w-full h-auto object-cover aspect-[3/4] md:aspect-[4/5] select-none"
              priority
            />

            <!-- tarjetita flotante -->
            <div class="absolute -bottom-5 left-5 right-5 md:left-auto md:right-[-16px] md:bottom-6 md:w-56 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg">
              <p class="text-sm text-neutral-200">
                Disponible para <span class="font-semibold">colaboraciones</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Texto / Contenido -->
        <div class="md:col-span-7 order-none">
          <!-- badge -->
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide">
            <span class="h-2 w-2 rounded-full bg-white/80"></span>
            Portfolio · 2025
          </div>

          <h1 class="mt-4 text-5xl md:text-6xl leading-[1.1] font-black">
            <span class="block">Hola, soy</span>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Víctor Vera
            </span>
          </h1>

          <!-- texto más personal -->
          <p class="mt-4 text-neutral-300 max-w-2xl">
            Me gusta entender a las personas antes de escribir una línea de código. Disfruto
            simplificar ideas, darle forma a los detalles y construir cosas que se sientan claras,
            rápidas y agradables. Soy de Málaga, me tira la montaña y me motiva trabajar con equipos
            donde se aprende compartiendo.
          </p>
          <p class="mt-3 text-neutral-300 max-w-2xl">
            He hecho proyectos propios (apps, webs y algún bot útil) y me quedo con lo que aprendo por
            el camino: escuchar, iterar sin miedo y celebrar cada avance, por pequeño que sea.
          </p>

          <!-- chips de principios en lugar de tecnologías -->
          <ul class="mt-5 flex flex-wrap gap-2">
            <li class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Claridad primero</li>
            <li class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Iteración rápida</li>
            <li class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Atención al detalle</li>
            <li class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Trabajo en equipo</li>
          </ul>

          <!-- CTAs -->
          <div class="mt-6 flex flex-wrap gap-3">
            <a routerLink="/projects"
               class="px-5 py-3 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/20 font-semibold">
               Ver proyectos
            </a>

            <a routerLink="/contact"
               class="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90">
               Contactar
            </a>
          </div>

          <!-- micro métricas (más humanas) -->
          <div class="mt-6 grid grid-cols-3 max-w-md gap-3 text-center">
            <div class="rounded-xl border border-white/10 bg-white/5 p-3">
              <div class="text-xl font-extrabold">Constancia</div>
              <div class="text-xs text-neutral-300">Itero y documento</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-3">
              <div class="text-xl font-extrabold">Personas</div>
              <div class="text-xs text-neutral-300">Escucha y feedback</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-3">
              <div class="text-xl font-extrabold">Sencillez</div>
              <div class="text-xs text-neutral-300">Menos ruido, más valor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}
