import * as AppState from "@core/app.state";

export interface IAppState extends AppState.IAppState {
	auth: IAuthState;
}

export interface IAuthState {
	isLogged: boolean,
	accessToken: string | undefined,
	reporterId: number | undefined,
	error: string
}
