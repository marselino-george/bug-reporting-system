import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '../user.service';

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
		private toastr: ToastrService
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6), Validators.max(20)]]
		});
	}

	ngOnInit(): void {
	}

	login() {

	}

	rememberMeCheckBox() {
		// https://charbase.com/1f612-unicode-unamused-face
		// https://charbase.com/1f613-unicode-face-with-cold-sweat
		this.toastr.error('I don\'t know how to remember you yet \ud83d\ude13', 'Sorry');
	}
}
