import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { ResponseError, ResponseInterface } from '../../shared/types/response.interface';
import { loginRequestInterface } from '../types/loginRequest.interface';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Register': props<RegisterRequestInterface>(),
        'Register Success': props<ResponseInterface<CurrentUserInterface>>(),
        'Register Failure': props<ResponseError>(),
        'Login': props<loginRequestInterface>(),
        'Login Success': props<ResponseInterface<CurrentUserInterface>>(),
        'Login Failure': props<ResponseError>(),
        'Logout': emptyProps()
        // 'getCurrentUser': emptyProps(),
        // 'getCurrentUser Success': props<{ user: any }>(),
        // 'getCurrentUser Failure': props<{ error: any }>(),
    }
});
