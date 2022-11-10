import { Component, OnInit } from '@angular/core';
import { AuthService, IAppState } from '@core/auth';
import { Store } from '@ngrx/store';

@Component({
	selector: 'brs-top-nav-bar',
	templateUrl: './top-nav-bar.component.html',
	styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

	constructor(private store: Store<IAppState>, public authService: AuthService) { }

	ngOnInit(): void {
	}


}
