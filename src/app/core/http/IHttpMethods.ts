import { Observable } from 'rxjs';


export interface IHttpMethods {
	get<T>(url: string): Observable<T>;
	post<T, H>(url: string, data: H): Observable<T>;
}
