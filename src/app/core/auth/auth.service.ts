import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@core/http/http.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpService, private router: Router) { }

	login<T, H>(data: H): Observable<T> {
		return this.http.post<any, H>(`login`, data).pipe(
			tap(result => this.saveToken(result)),
			catchError(error => throwError(() => `Something went wrong: ${error.message}`))
		);
	}

	register<T, H>(data: H): Observable<T> {
		return this.http.post<T, H>(`register`, data).pipe(
			tap(result => this.saveToken(result)),
			catchError(error => throwError(() => `Something went wrong: ${error.message}`))
		);
	}

	logout() {
		this.router.navigate(['user', 'logout']);
	}

	private saveToken(data: any) {
		localStorage.setItem('accessToken', data.accessToken);
	}
}
