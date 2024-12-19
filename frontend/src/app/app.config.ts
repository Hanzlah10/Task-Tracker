import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/services/auth.interceptor';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as authEffects from './auth/store/effects';
import * as taskEffects from './tasks/store/effects';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { taskFeatureKey, taskReducer } from './tasks/store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(authEffects, taskEffects),
    provideState(authFeatureKey, authReducer),
    provideState(taskFeatureKey, taskReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
