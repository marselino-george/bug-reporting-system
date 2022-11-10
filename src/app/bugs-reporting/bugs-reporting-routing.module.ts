import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutGuard, IsLoggedInGuard } from '@core/auth';
import { NoopComponent } from '@shared/noop/noop.component';
import { BugsReportingShellComponent } from './bugs-reporting-shell/bugs-reporting-shell.component';

const routes: Routes = [
	// { path: 'add', component: LoginComponent, canActivate: [IsLoggedInGuard] },
	// { path: 'edit', component: NoopComponent, canActivate: [LogoutGuard] },
	{ path: '', component: BugsReportingShellComponent, canActivate: [IsLoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugsReportingRoutingModule { }
