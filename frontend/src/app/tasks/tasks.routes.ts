import { Route } from "@angular/router";
import { LandingPageTodoComponent } from "./components/landing-page-todo/landing-page-todo.component";

export const tasksRoutes: Route[] = [
    {
        path: '',
        component: LandingPageTodoComponent
    }
]