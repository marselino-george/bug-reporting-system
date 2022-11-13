import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/auth';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subject, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { IBugResponse, ICommentResponse, IReporterResponse } from '../models/ibugresponse.model';


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
	searchForm: FormGroup;
	destroy$ = new Subject<any>();

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService) {

		this.bugs$ = of(this.originalBugs);

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
					searchColPriority: val.searchColPriority.trim(),
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
			searchColPriority: (valId: number, checkAgainst: number) => valId === checkAgainst,
			searchColReporter: simpleStrIncludes,
			searchColStatus: simpleStrIncludes
		} as { [id: string]: any } ;

		const checkNullOrEmpty = (checkStr: string) : boolean => {
			return checkStr != null && checkStr.trim() != ''
		};

		combineLatest([
			of(this.originalBugs),
			searchForm$
		])
		.pipe(
			untilDestroyed(this),
			map(([originalBugs, searchForm]) => {

				const searchFromNonEmptyFields = Object.entries(searchForm)
					.filter(([key, value]) => checkNullOrEmpty(value));

				if (searchFromNonEmptyFields.length === 0) {
					return {
						filteredBugs: originalBugs,
						searchForm
					};
				}

				let filteredBugs = originalBugs.filter((item) => {
					let finalArrayResults = [];

					for (let i = 0; i < searchFromNonEmptyFields.length; i++) {
						type ObjectKey = keyof typeof item; // Dynamically access Dictionary in TypeScript

						const element = searchFromNonEmptyFields[i];

						let valueToTest = item[filterMaps[element[0]] as ObjectKey];

						// type ObjectKeyOfFilterActions = keyof typeof filterActions;
						const isMatchingElement : boolean = filterActions[element[0]](valueToTest, element[1]);
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
