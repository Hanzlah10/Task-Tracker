import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistenceService } from './persistence.service';

export const authInterceptor: HttpInterceptorFn = (oldRequest, next) => {
    const persistenceService = inject(PersistenceService);
    const token = persistenceService.get('refreshToken');

    if (token != null) {
        return next(
            oldRequest.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            })
        );
    }

    return next(oldRequest);
};
