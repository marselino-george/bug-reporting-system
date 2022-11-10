
export interface IReporterState {
	id: number;
	code: string;
	description: string;
}

export interface IBugState {
	id: string;
	title: string;
	description: string;
	priority: number;
	reporter: IReporterState
}
