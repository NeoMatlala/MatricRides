import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsService } from './services/google-maps/google-maps.service';

export function initializeApp(googleMapsLoaderService: GoogleMapsService): () => Promise<void>{
  return () => googleMapsLoaderService.loadScript()
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    GoogleMapsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [GoogleMapsService],
      multi: true
    }
  ]
};
