import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LogoutGuard } from '@core/auth';
import { NoopComponent } from '@shared/noop/noop.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'logout', component: NoopComponent, canActivate: [LogoutGuard] },
	{ path: 'register', component: UserRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
