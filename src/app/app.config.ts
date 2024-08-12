import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMessaging } from '@angular/fire/messaging';
import { MessageService } from 'primeng/api';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp(environment.firebaseConfig)
    ),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideAnimations(),
    MessageService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
};
