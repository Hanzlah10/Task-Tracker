import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes').then(m => m.loginRoutes)
    },
    {
        path: 'register',
        loadChildren: () => import('./auth/auth.routes').then(m => m.registerRoutes)
    },
    {
        path: '',
        loadChildren: () => import('./tasks/tasks.routes').then(m => m.tasksRoutes),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
