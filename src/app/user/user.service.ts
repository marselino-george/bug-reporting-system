import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { Observable } from 'rxjs';
import { IReporter } from './models/reporter.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpService) { }

	getReporters(): Observable<IReporter[]> {
		return this.http.get<IReporter[]>('reporters');
	}
}
