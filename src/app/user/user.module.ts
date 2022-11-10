import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		LoginComponent,
		UserRegistrationComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		ReactiveFormsModule
	]
})
export class UserModule { }
