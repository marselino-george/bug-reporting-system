import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/auth/auth.module';

import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
	AuthModule,
    AppRoutingModule,
	StoreModule.forRoot({}),
	EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'Bug Reporting System Devtools' }),
	ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
