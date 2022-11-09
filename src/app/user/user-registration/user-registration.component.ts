import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, first, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@core/auth/';
import { IReporter } from '../models/reporter.model';
import { UserService } from '../user.service';


@Component({
	selector: 'bsr-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

	reporters$: Observable<IReporter[]> | undefined;
	registerForm: FormGroup;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService) {

		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6), Validators.max(20)]],
			reporter: ['', [Validators.required]]
		});
		// Long syntax using FormGroup:
		// this.registerForm = new FormGroup({
		// 	email: new FormControl(),
		// 	password: new FormControl()
		// });
	 }

	ngOnInit(): void {
		this.getReporters();

	}

	public getReporters() {
		this.reporters$ = this.userService.getReporters().pipe(
			catchError(() => {
				return EMPTY;
			}),
			first()
		);
	}

	register() {
		const result$ = this.authService.register({});

	}

	get email() { return this.registerForm.get('email'); }
	get password() { return this.registerForm.get('password'); }
}
