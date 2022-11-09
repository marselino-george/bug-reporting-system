import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

	constructor(private store: Store, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

			// this.store.dispatch(logout());
    		return this.router.createUrlTree(['user', 'login']);
	}

}
