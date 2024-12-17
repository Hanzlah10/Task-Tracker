import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistenceService } from './persistence.service';

export const authInterceptor: HttpInterceptorFn = (oldRequest, next) => {
    const peristenceService = inject(PersistenceService);
    const token = peristenceService.get('refreshToken');
    if (token) {
        let request = oldRequest.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(request);
    }
    return next(oldRequest)
};


