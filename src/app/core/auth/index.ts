export * as AuthActions from './state/auth.actions';
// export * as AuthSelectors from './auth.selectors'
// export { AuthEffects }  from './auth.effects'
export { IAppState, IAuthState } from './state/auth.state'
export { authReducer } from './state/auth.reducer';
export { AuthService } from './auth.service';
export { ILoginRequest } from './models/login.model';
export { INewUserRegister as IRegister } from './models/register.model';

export { IsLoggedInGuard } from './is-logged-in.guard';
export { LogoutGuard } from './logout.guard';
