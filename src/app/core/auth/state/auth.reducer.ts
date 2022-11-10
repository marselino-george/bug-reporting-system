import { createReducer, on } from "@ngrx/store";
import { IAuthState } from "./auth.state";
import * as AuthActions from './auth.actions'

const initialState: IAuthState = {
	isLogged: false,
	accessToken: undefined,
	reporterId: undefined,
	error: ''
};

export const authReducer = createReducer<IAuthState>(
	initialState,
	on(AuthActions.setAuthToken, (state, action): IAuthState => {
		return {
			...state,
			accessToken: action.accessToken
		};
	}),

);
