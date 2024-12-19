import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ResponseInterface } from "../../shared/types/response.interface";
import { TaskInterface } from "../types/task.interface";
import { CreateTaskInterface } from "../types/createTask.interface";
import { PersistenceService } from "../../shared/services/persistence.service";

@Injectable({
    providedIn: 'root'
})

export class taskService {

    constructor(private http: HttpClient, private persistenceService: PersistenceService) { }

    getAllTasks(): Observable<ResponseInterface<[TaskInterface]>> {
        const token = this.persistenceService.get('token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        const url = environment.apiUrl + 'tasks/';
        return this.http.get<ResponseInterface<[TaskInterface]>>(url, options);
    }

    getSingleTask(id: number): Observable<ResponseInterface<TaskInterface>> {
        const token = this.persistenceService.get('token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        const url = environment.apiUrl + 'tasks/' + id;
        return this.http.get<ResponseInterface<TaskInterface>>(url, options);
    }

    addTask(task: CreateTaskInterface): Observable<ResponseInterface<[TaskInterface]>> {
        const token = this.persistenceService.get('token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        const url = environment.apiUrl + 'tasks/create';
        return this.http.post<ResponseInterface<[TaskInterface]>>(url, task, options);
    }

    updateTask(id: number, task: CreateTaskInterface): Observable<ResponseInterface<TaskInterface>> {
        const token = this.persistenceService.get('token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        const url = environment.apiUrl + 'tasks/update/' + id;
        return this.http.patch<ResponseInterface<TaskInterface>>(url, task, options);
    }

    deleteTask(id: number): Observable<ResponseInterface<[TaskInterface]>> {
        const token = this.persistenceService.get('token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const options = { headers }
        const url = environment.apiUrl + 'tasks/delete/' + id;
        return this.http.delete<ResponseInterface<[TaskInterface]>>(url, options);
    }
}

