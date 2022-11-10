import { createAction, props } from "@ngrx/store";

const namespace = '[Auth]';

export const setAuthToken = createAction(
	createActionTitle('Set Current Token'),
	props<{ accessToken: string }>()
);


function createActionTitle(action: string) {
	return `${namespace} ${action}`;
}
