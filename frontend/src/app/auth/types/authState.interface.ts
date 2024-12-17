import { CurrentUserInterface } from "./currentUser.interface";

export interface authStateInterface {
    currentUser: CurrentUserInterface | null;
    validationMessage: string | null;
    errors: any
}