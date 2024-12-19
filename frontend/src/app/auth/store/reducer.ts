import { createFeature, createReducer, on } from "@ngrx/store";
import { authStateInterface } from "../types/authState.interface";
import { AuthActions } from "./actions";

const initialState: authStateInterface = {
    currentUser: null,
    validationMessage: null,
    errors: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(AuthActions.registerSuccess, (state, action) => ({
            ...state,
            validationMessage: action.message

        })),
        on(AuthActions.registerFailure, (state, action) => ({
            ...state,
            validationMessage: action.message,
            errors: action.errors

        })),
        on(AuthActions.loginSuccess, (state, action) => ({
            ...state,
            currentUser: action.data,
            validationMessage: action.message

        })),
        on(AuthActions.loginFailure, (state, action) => ({
            ...state,
            validationMessage: action.message,
            errors: action.errors

        })),
        on(AuthActions.getCurrentUserSuccess, (state, action) => ({
            ...state,
            currentUser: action.data,
            validationMessage: action.message
        })),
        on(AuthActions.logout, (state) => ({
            ...state,
            currentUser: null
        }))
    )
})

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectCurrentUser,
    selectValidationMessage
} = authFeature