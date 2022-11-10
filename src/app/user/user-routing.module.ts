import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LogoutGuard, IsLoggedInGuard } from '@core/auth';
import { NoopComponent } from '@shared/noop/noop.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard] },
	{ path: 'logout', component: NoopComponent, canActivate: [LogoutGuard] },
	{ path: 'register', component: UserRegistrationComponent, canActivate: [IsLoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
