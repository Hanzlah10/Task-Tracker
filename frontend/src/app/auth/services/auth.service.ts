import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { loginRequestInterface } from "../types/loginRequest.interface";
import { ResponseInterface } from "../../shared/types/response.interface";
import { Observable } from "rxjs";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { PersistenceService } from "../../shared/services/persistence.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient, private persistenceService: PersistenceService) { }

    loginUser(data: loginRequestInterface): Observable<ResponseInterface<CurrentUserInterface>> {
        let url = environment.apiUrl + 'users/login'
        return this.http.post<ResponseInterface<CurrentUserInterface>>(url, data)
    }

    registerUser(data: RegisterRequestInterface): Observable<ResponseInterface<CurrentUserInterface>> {
        let url = environment.apiUrl + 'users/register'
        return this.http.post<ResponseInterface<CurrentUserInterface>>(url, data)
    }

    logoutUser(): Observable<ResponseInterface<{}>> {
        const token = this.persistenceService.get('token')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        let url = environment.apiUrl + 'users/logout'
        return this.http.get<ResponseInterface<{}>>(url, options)
    }
    getCurrentUser(): Observable<ResponseInterface<CurrentUserInterface>> {
        const token = this.persistenceService.get('token')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        let url = environment.apiUrl + 'users/currentUser'

        return this.http.get<ResponseInterface<CurrentUserInterface>>(url, options)
    }
}