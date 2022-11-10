import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, first, map, Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@core/auth/';
import { IReporter } from '../models/reporter.model';
import { UserService } from '../user.service';
import { INewUserRegister, IUserRegistrationResponse } from '@core/auth/models/register.model';


@Component({
	selector: 'bsr-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

	reporters$: Observable<IReporter[]> | undefined;
	registrationForm: FormGroup;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService) {

		this.registrationForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.minLength(5)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
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
		if (!this.registrationForm.valid) {
			this.toastr.error('Please fill all the required fields.');
			return;
		}

		const reporterId = Number(this.registrationForm.get('reporter')?.value);

		this.reporters$?.pipe(
			map( results => results.filter(r => r.id === reporterId) ),
			first()
		).subscribe((reporters: IReporter[]) => {
			let foundReporter: IReporter = reporters[0];
			const newUser = {
				email: this.registrationForm.get('email')?.value,
				password: this.registrationForm.get('password')?.value,
				name: this.registrationForm.get('name')?.value,
				reporter: foundReporter
			} as INewUserRegister;
			this.authService.register<IUserRegistrationResponse, INewUserRegister>(newUser).pipe(
				catchError(err => {
					return EMPTY;
				}),
				first(),

			).subscribe((item: IUserRegistrationResponse) => {
				if (item.accessToken == null || item.accessToken == '') {
					this.toastr.error('Registration couldn\'t be performed. Please try again.');
					return;
				}

				this.toastr.success('Registration completed successfully \ud83d\ude01');
			});
		});
	}

	get email() { return this.registrationForm.get('email'); }
	get password() { return this.registrationForm.get('password'); }
}
