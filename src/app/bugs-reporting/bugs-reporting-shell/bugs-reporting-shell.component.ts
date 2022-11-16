import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/auth';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subject, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { IBugResponse, ICommentResponse, IPriorityResponse, IReporterResponse } from '../models/ibugresponse.model';
import { HttpService } from '@core/http/http.service';


interface ISearchableBugsTable {
	searchColTitle: string;
	searchColPriority: string;
	searchColReporter: string;
	searchColStatus: string;
}

@UntilDestroy()
@Component({
	selector: 'brs-bugs-reporting-shell',
	templateUrl: './bugs-reporting-shell.component.html',
	styleUrls: ['./bugs-reporting-shell.component.scss']
})
export class BugsReportingShellComponent implements OnInit {

	bugs$: Observable<IBugResponse[]>;
	reporters$: Observable<IReporterResponse[]>;
	priorities$: Observable<IPriorityResponse[]>;
	searchForm: FormGroup;
	destroy$ = new Subject<any>();


	constructor(
		private authService: AuthService,
		private http: HttpService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService) {

		this.bugs$ = this.http.get<IBugResponse[]>('bugs'); // of(this.originalBugs);

		this.priorities$ = this.http.get<IPriorityResponse[]>('priorities');
		this.reporters$ = this.http.get<IReporterResponse[]>('reporters');

		this.searchForm = this.formBuilder.group({
			searchColTitle: '',
			searchColPriority: '',
			searchColReporter: '',
			searchColStatus: ''
		} as ISearchableBugsTable);

		let searchForm$ = this.searchForm.valueChanges.pipe(
			debounceTime(400),
			map((val: ISearchableBugsTable) => {

				return {
					searchColTitle: val.searchColTitle.trim(),
					searchColPriority: val.searchColPriority,
					searchColReporter: val.searchColReporter.trim(),
					searchColStatus: val.searchColStatus.trim()
				};

			}),
			distinctUntilChanged()
		);

		const filterMaps = {
			searchColTitle: 'title',
			searchColPriority: 'priority',
			searchColReporter: 'reporter',
			searchColStatus: 'status'
		} as { [id: string]: string } ;

		const simpleStrIncludes = (val: string, checkAgainst: string) => {
			return val.includes(checkAgainst);
		};
		const filterActions = {
			searchColTitle: simpleStrIncludes,
			searchColPriority: (valId: number, checkAgainst: number) => valId == Number(checkAgainst),
			searchColReporter: (val: any, checkAgainst: number) => {
				return val.id === Number(checkAgainst);
			},
			searchColStatus: simpleStrIncludes
		} as { [id: string]: any } ;

		const isNullOrEmpty = (checkStr: string | null) : boolean =>
			!(checkStr != null && checkStr.trim() != '');

		combineLatest([
			of(this.originalBugs),
			searchForm$
		])
		.pipe(
			untilDestroyed(this),
			map(([originalBugs, searchForm]) => {

				const searchFromNonEmptyFields = Object.entries(searchForm)
					.filter(([key, value]) => !isNullOrEmpty(value));

				if (searchFromNonEmptyFields.length === 0) {
					return {
						filteredBugs: originalBugs,
						searchForm
					};
				}

				let filteredBugs = originalBugs.filter((item) => {
					let finalArrayResults = [];
					type ObjectKey = keyof typeof item; // Dynamically access Dictionary in TypeScript

					for (let i = 0; i < searchFromNonEmptyFields.length; i++) {

						const element = searchFromNonEmptyFields[i];

						let valueToTest = item[filterMaps[element[0]] as ObjectKey];

						// type ObjectKeyOfFilterActions = keyof typeof filterActions;
						const elKey  = element[0];
						const elVal = element[1];
						const isMatchingElement : boolean = filterActions[elKey](valueToTest, elVal);
						if (isMatchingElement) {
							finalArrayResults.push(item);
							break;
						}
					}

					return finalArrayResults.length > 0;
				});


				return {
					filteredBugs,
					searchForm
				};
			})
		)
		.subscribe(items => {
			this.bugs$ = of(items.filteredBugs);
		});
	}

	ngOnInit(): void {

	}


	createNewBug() {
		this.toastr.info('Sorry this feature has not been implemented yet');
	}

	editBug() {
		this.toastr.info('Sorry this feature has not been implemented yet');
	}

	deleteBug() {
		this.toastr.info('Sorry this feature has not been implemented yet');
	}

	originalBugs: IBugResponse[] = [
		{
			"id": "1",
			"title": "bug 1",
			"description": "This is a simple bug",
			"priority": 1,
			"reporter": {
				"id": 1,
				"code": "QA",
				"description": "QA"
			} as IReporterResponse,
			"status": "Done",
			"created": new Date("2022-10-27"),
			"comments": [
				{
					"reporter": "Fan",
					"description": "this is just a description"
				}
			] as ICommentResponse[]
		},
		{
			"id": "6358f56cbf47a30046de24f0",
			"title": "bug 2",
			"description": "This is a simple bug",
			"priority": 2,
			"reporter": {
				"id": 1,
				"code": "QA",
				"description": "QA"
			} as IReporterResponse,
			"status": "Done",
			"created": new Date("2022-10-26"),
			"comments": [
				{
					"reporter": "Fan",
					"description": "this is just a description"
				}
			] as ICommentResponse[]
		},
		{
			"id": "3",
			"title": "bag test",
			"description": "this is a test description",
			"priority": 0,
			"reporter": {
				"id": 2,
				"code": "DEV",
				"description": "Developer"
			} as IReporterResponse,
			"status": "For Review",
			"created": new Date("2022-09-30T16:32:19.595Z"),
			"comments": [] as ICommentResponse[]
		}
	];
}
