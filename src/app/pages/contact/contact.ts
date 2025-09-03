import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgOptimizedImage],
  template: `
    <!-- HERO -->
    <section class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-8 md:p-12 mb-10">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-black leading-tight">Trabajemos juntos</h1>
        <p class="mt-3 text-neutral-300">
          Cuéntame qué necesitas y preparo una propuesta. Suelo responder el mismo día.
        </p>

        <!-- chips -->
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Android · Kotlin</span>
          <span class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Angular · Tailwind</span>
          <span class="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5">Spring Boot</span>
        </div>
      </div>

      <!-- halo decorativo -->
      <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
    </section>

    <section class="grid gap-10 lg:grid-cols-12">
      <!-- PANEL IZQUIERDO (sticky) -->
      <aside class="lg:col-span-4">
        <div class="lg:sticky lg:top-8 space-y-6">
          <!-- Tarjeta perfil -->
          <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div class="flex items-center gap-4">
              <img ngSrc="/assets/home/me.webp" width="96" height="96" alt="Vera"
                   class="h-16 w-16 rounded-2xl object-cover border border-white/10" />
              <div>
                <div class="font-semibold text-lg">Vera</div>
                <div class="text-sm text-neutral-400">Android & Web</div>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <a href="mailto:verarv99@gmail.com"
                 class="rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-sm hover:border-white/30 transition">
                ✉️ Email
              </a>
              <a href="https://github.com/verarv1999" target="_blank" rel="noopener"
                 class="rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-sm hover:border-white/30 transition">
                ⓖ GitHub
              </a>
              <a href="https://www.linkedin.com/in/victor-vera-rodriguez-b5433b359/" target="_blank" rel="noopener"
                 class="rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-sm hover:border-white/30 transition col-span-2">
                in /vera-dev
              </a>
            </div>

            <div class="mt-5 rounded-2xl border border-dashed border-white/15 p-4 text-xs text-neutral-400">
              ¿Prefieres calendarizar? Escríbeme y te paso un enlace con mis huecos.
            </div>
          </div>

          <!-- Disponibilidad -->
          <div class="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6">
            <div class="text-sm text-neutral-300">
              <div class="font-semibold mb-1">Disponibilidad</div>
              Málaga · Presencial / Híbrido · También freelance por proyecto.
            </div>
            <a href="assets/navbar/cv.pdf" target="_blank" rel="noopener"
               class="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:opacity-90">
              Ver CV (PDF) ↗
            </a>
          </div>
        </div>
      </aside>

      <!-- FORMULARIO -->
      <div class="lg:col-span-8">
        <div class="rounded-3xl border border-white/10 bg-neutral-950 p-6 md:p-8">
          <!-- Toasts -->
          <div *ngIf="success()"
               class="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm">
            ¡Gracias! Tu mensaje ha salido perfecto. Te respondo en breve.
          </div>
          <div *ngIf="error()"
               class="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">
            Ups, algo falló al enviar. Prueba otra vez dentro de un momento.
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit($event)" #formRef>
            <!-- Inputs ocultos para Formspree -->
            <input type="hidden" name="_subject"  value="Nuevo contacto — Portfolio" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_replyto"  [value]="form.get('from_email')?.value || ''" />

            <!-- Nombre / Email -->
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="from_name" class="block text-xs uppercase tracking-wide text-neutral-400">Nombre</label>
                <input id="from_name" name="from_name" type="text" formControlName="from_name" placeholder="Cómo te llamas"
                       class="mt-1 w-full bg-transparent border-b border-white/15 focus:border-white/40 outline-none py-2" />
                <p *ngIf="form.get('from_name')?.touched && form.get('from_name')?.invalid"
                   class="text-xs text-red-400 mt-1">El nombre es obligatorio.</p>
              </div>

              <div>
                <label for="from_email" class="block text-xs uppercase tracking-wide text-neutral-400">Email</label>
                <input id="from_email" name="from_email" type="email" formControlName="from_email" placeholder="tucorreo@dominio.com"
                       class="mt-1 w-full bg-transparent border-b border-white/15 focus:border-white/40 outline-none py-2" />
                <p *ngIf="form.get('from_email')?.touched && form.get('from_email')?.invalid"
                   class="text-xs text-red-400 mt-1">Introduce un email válido.</p>
              </div>
            </div>

            <!-- separador -->
            <div class="my-8 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>

            <!-- Mensaje -->
            <div>
              <div class="flex items-end justify-between">
                <label for="message" class="block text-xs uppercase tracking-wide text-neutral-400">Mensaje</label>
                <span class="text-xs text-neutral-500">
                  {{ (form.get('message')?.value?.length || 0) }}/1000
                </span>
              </div>
              <textarea id="message" name="message" rows="7" formControlName="message"
                        placeholder="Cuéntame lo esencial: contexto, objetivo y plazos si los hay."
                        class="mt-1 w-full resize-y rounded-xl bg-neutral-900/60 border border-white/10 focus:border-white/30 outline-none p-4"></textarea>
              <p *ngIf="form.get('message')?.touched && form.get('message')?.invalid"
                 class="text-xs text-red-400 mt-1">Escribe al menos 10 caracteres.</p>
            </div>

            <!-- Nota + CTA -->
            <div class="mt-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
              <p class="text-xs text-neutral-500">
                Al enviar aceptas que use tu email para responderte. No comparto tus datos.
              </p>
              <button type="submit"
                      [disabled]="form.invalid || loading()"
                      class="w-full md:w-auto inline-flex justify-center px-6 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 disabled:opacity-50">
                {{ loading() ? 'Enviando…' : 'Enviar mensaje' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  loading = signal(false);
  success = signal(false);
  error   = signal(false);

  form!: FormGroup;

  // Nuevo ID de Formspree
  private FSP_FORM_ID = 'f/mblaznkw';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_name:  ['', [Validators.required, Validators.minLength(2)]],
      from_email: ['', [Validators.required, Validators.email]],
      message:    ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onSubmit(ev: Event) {
    ev.preventDefault();
    this.success.set(false);
    this.error.set(false);

    if (this.form.invalid || !this.formRef?.nativeElement) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      const formData = new FormData(this.formRef.nativeElement);
      const res = await fetch(`https://formspree.io/${this.FSP_FORM_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (!res.ok) throw new Error('Formspree error');
      this.success.set(true);
      this.form.reset();
    } catch (e) {
      console.error(e);
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
