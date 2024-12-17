import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "./actions";
import { map, switchMap } from "rxjs";

export const registerEffect = createEffect(
    (
        action$ = inject(Actions),
        authService = inject(AuthService)
    ) => {
        return action$.pipe(
            ofType(AuthActions.register),
            switchMap(({ request }) => {
                authService.registerUser(request).pipe(
                    map((response) => {
                        return AuthActions.registerSuccess(response)
                    }),

                )
            })
        )
    }
)