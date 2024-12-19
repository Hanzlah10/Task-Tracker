import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "./actions";
import { catchError, map, of, switchMap, take, tap } from "rxjs";
import { ResponseErrorInterface, ResponseInterface } from "../../shared/types/response.interface";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { loginRequestInterface } from "../types/loginRequest.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { PersistenceService } from "../../shared/services/persistence.service";
import { Router } from "@angular/router";

export const registerEffects = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
    ) => {
        return actions$.pipe(
            ofType(AuthActions.register),
            switchMap((request: RegisterRequestInterface) =>
                authService.registerUser(request).pipe(
                    map((response: ResponseInterface<CurrentUserInterface>) => {
                        return AuthActions.registerSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            AuthActions.registerFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
);


export const loginEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistenceService = inject(PersistenceService)
    ) => {
        return actions$.pipe(
            ofType(AuthActions.login),
            switchMap((request: loginRequestInterface) =>
                authService.loginUser(request).pipe(
                    map((response: ResponseInterface<CurrentUserInterface>) => {
                        persistenceService.set('token', response.data.refreshToken)
                        return AuthActions.loginSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            AuthActions.loginFailure(errorResponse)
                        ))
                )
            )
        )
    },
    {
        functional: true
    }
)



export const logoutEffect = createEffect(
    (
        persistenceService = inject(PersistenceService),
        actions$ = inject(Actions),
        router = inject(Router),
    ) => {
        return actions$.pipe(
            ofType(AuthActions.logout),
            take(1),
            tap(() => {
                persistenceService.set('token', '');
                router.navigateByUrl('/login');
            })
        );
    },
    { functional: true, dispatch: false }
);


export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions),
        router = inject(Router),
    ) => {
        return actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(() => {
                router.navigateByUrl('/');
            })
        );
    },
    { functional: true, dispatch: false }
);

export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(AuthActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/login');
            })
        );
    },
    { functional: true, dispatch: false }
);



