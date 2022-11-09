import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
	// {
	// 	path: 'bug-report',
	// 	loadChildren: () => import('./bugs-reporting/bugs-reporting.module').then(i => i.BugsReportingModule ),
	// 	canLoad: [AuthGuard]
	// },
	{ path: 'user', loadChildren: () => import('./user/user.module').then(i => i.UserModule ) },
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
