import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private router: Router) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = localStorage.getItem('accessToken');
		const authRequest = request.clone({
			setHeaders: {
				'Content-Type': 'application/json',
				Authorization: !token ? '' : `Bearer ${token}`,
			},
			withCredentials: true
		});
		return next.handle(authRequest).pipe(
			catchError(error => this.handleAuthError(error)));
	}

	private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {

			localStorage.clear();
            this.router.navigateByUrl(`/login`);

            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(() => err);
    }
}
