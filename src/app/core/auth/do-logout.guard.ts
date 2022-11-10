import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class DoLogoutGuard implements CanActivate {

	constructor(private store: Store, private router: Router, private authService: AuthService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

			// this.store.dispatch(logout());
			localStorage.clear();
    		return this.router.createUrlTree(['user', 'login']);
	}

}
