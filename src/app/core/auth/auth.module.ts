import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
	StoreModule.forFeature('auth', authReducer),
	// 	EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
  ]
})
export class AuthModule { }
