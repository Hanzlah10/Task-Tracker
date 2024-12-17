import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { loginRequestInterface } from "../types/loginRequest.interface";
import { ResponseInterface } from "../../shared/types/response.interface";
import { Observable } from "rxjs";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../types/currentUser.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) { }


    loginUser(data: loginRequestInterface): Observable<ResponseInterface<CurrentUserInterface>> {
        let url = environment.apiUrl + '/login'
        return this.http.post<ResponseInterface<CurrentUserInterface>>(url, data)
    }

    registerUser(data: RegisterRequestInterface): Observable<ResponseInterface<CurrentUserInterface>> {
        let url = environment.apiUrl + '/register'
        return this.http.post<ResponseInterface<CurrentUserInterface>>(url, data)
    }
}