export interface IBugResponse {
	id: string;
	title: string;
	description: string;
	priority: number;
	reporter: IReporterResponse,
	status: string;
	created: Date,
	comments: ICommentResponse[]
};

export interface IPriorityResponse {
	id: number;
	weight: number;
	description: string;
}

export interface IReporterResponse {
	id: number;
	code: string;
	description: string;
	permissions: IPermissionsResponse;
}

export interface IPermissionsResponse {
	canAdd: boolean;
	canEdit: boolean;
	canDelete: boolean;
	canSearch: boolean;
	canComment: boolean;
}

export interface ICommentResponse {
	reporter: string;
	description: string;
}
