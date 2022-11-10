import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '@core/auth';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	// {
	// 	path: 'bug-report',
	// 	loadChildren: () => import('./bugs-reporting/bugs-reporting.module').then(i => i.BugsReportingModule ),
	// 	canLoad: [AuthGuard]
	// },
	{ path: 'user', loadChildren: () => import('./user/user.module').then(i => i.UserModule ) },
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
