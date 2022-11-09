import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IHttpMethods } from './IHttpMethods';

@Injectable({
	providedIn: 'root'
})
export class HttpService implements IHttpMethods {

	constructor(private http: HttpClient) { }

	get<T>(url: string): Observable<T> {
		return this.http.get<T>(`${environment.apiUrl}${url}`);
	}

	post<T, H>(url: string, data: H): Observable<T> {
		return this.http.post<T>(`${environment.apiUrl}${url}`, data);
	}
}
