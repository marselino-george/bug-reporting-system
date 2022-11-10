import { IReporter } from "src/app/bugs-reporting/bugs-reporting.reducer";

export interface INewUserRegister {
	email: string;
	password: string;
	name: string;
	reporter: IReporter;
}

export interface IUserRegistrationResponse {
	accessToken: string;
	user: IRegisteredUser;
}

export interface IRegisteredUser {
	id: number;
	email: string;
	name: string;
	reporter: IReporter;
}
