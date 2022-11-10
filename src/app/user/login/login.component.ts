import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '../user.service';
import { IUserRegistrationResponse } from '@core/auth/models/register.model';
import { ILoginRequest } from '@core/auth/models/login.model';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'bsr-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.minLength(5)]],
		});
	}

	ngOnInit(): void {
	}

	login() {
		if (!this.loginForm.valid) {
			this.toastr.error('Please fill all the required fields.');
			return;
		}

		const existingUser = {
			email: this.loginForm.get('email')?.value,
			password: this.loginForm.get('password')?.value
		} as ILoginRequest;

		this.authService.login<IUserRegistrationResponse, ILoginRequest>(existingUser).pipe(
			catchError(err => {
				return EMPTY;
			}),
			first()
			// tap(() => {
			// 	this.router.createUrlTree(['home']);
			// })
		).subscribe((authUserResponse: IUserRegistrationResponse) => {
			if (authUserResponse.accessToken == null || authUserResponse.accessToken == '') {
				this.toastr.error('Wrong credentials.');
				return;
			}
			this.authService.setUser(authUserResponse);
			this.toastr.success('Login completed successfully \ud83d\ude01');
			this.router.navigate(['home']);
		});
	}

	rememberMeCheckBox() {

		// https://charbase.com/1f612-unicode-unamused-face
		// https://charbase.com/1f613-unicode-face-with-cold-sweat
		this.toastr.error('I don\'t know how to remember you yet \ud83d\ude13', 'Sorry');
	}
}
