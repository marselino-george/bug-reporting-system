import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoLogoutGuard, WhenIsLoggedInGuard } from '@core/auth';
import { NoopComponent } from '@shared/noop/noop.component';
import { BugsReportingShellComponent } from './bugs-reporting-shell/bugs-reporting-shell.component';

const routes: Routes = [
	{
		path: 'add',
		component: NoopComponent
	},
	{
		path: 'edit/:id',
		component: NoopComponent
	},
	{ path: '', component: BugsReportingShellComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugsReportingRoutingModule { }
