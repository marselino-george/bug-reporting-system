import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		StoreModule.forFeature('auth', authReducer),
		// 	EffectsModule.forFeature([AuthEffects])
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}]
})
export class AuthModule { }
