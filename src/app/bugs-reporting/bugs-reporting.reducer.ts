import { IAuthState } from "@core/auth/state/auth.state";


export interface IReporter {
	id: number;
	code: string;
	description: string;
	permissions: IReporterPermissions;
};

export interface IReporterPermissions {
	canAdd: boolean;
	canEdit: boolean;
	canDelete: boolean;
	canSearch: boolean;
	canComment: boolean;
}

export interface IUserInfo {
	email: string;
	reporter: IReporter;
};
