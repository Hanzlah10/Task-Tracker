import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ResponseInterface } from "../../shared/types/response.interface";
import { TaskInterface } from "../types/task.interface";

@Injectable({
    providedIn: 'root'
})

export class taskService {

    constructor(private http: HttpClient) { }

    getAllTasks(): Observable<ResponseInterface<[TaskInterface]>> {
        const url = environment.apiUrl + 'tasks/';
        return this.http.get<ResponseInterface<[TaskInterface]>>(url);
    }

    getSingleTask(id: string): Observable<ResponseInterface<TaskInterface>> {
        const url = environment.apiUrl + 'tasks/' + id;
        return this.http.get<ResponseInterface<TaskInterface>>(url);
    }

    addTask(task: TaskInterface): Observable<ResponseInterface<TaskInterface>> {
        const url = environment.apiUrl + 'tasks/create';
        return this.http.post<ResponseInterface<TaskInterface>>(url, task);
    }

    updateTask(task: TaskInterface): Observable<ResponseInterface<TaskInterface>> {
        const url = environment.apiUrl + 'tasks/update/' + task.id;
        return this.http.patch<ResponseInterface<TaskInterface>>(url, task);
    }

    deleteTask(id: number): Observable<ResponseInterface<{}>> {
        const url = environment.apiUrl + 'tasks/delete/' + id;
        return this.http.delete<ResponseInterface<{}>>(url);
    }
}

