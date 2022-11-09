export interface IReporter {
	id: number;
	code: string;
	description: string;
	permissions: IPermissions;
}

export interface IPermissions {
	canAdd: boolean;
	canEdit: boolean;
	canDelete: boolean;
	canSearch: boolean;
	canComment: boolean;
}
