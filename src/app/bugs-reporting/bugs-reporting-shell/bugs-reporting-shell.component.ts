import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/auth';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, takeUntil, tap, expand, iif, EMPTY } from 'rxjs';
import { IBugResponse, ICommentResponse, IReporterResponse } from '../models/ibugresponse.model';

interface ISearchableBugsTable {
	searchColTitle: string;
	searchColPriority: string;
	searchColReporter: string;
	searchColStatus: string;
}
@Component({
	selector: 'brs-bugs-reporting-shell',
	templateUrl: './bugs-reporting-shell.component.html',
	styleUrls: ['./bugs-reporting-shell.component.scss']
})
export class BugsReportingShellComponent implements OnInit, OnDestroy {

	bugs$!: Observable<IBugResponse[]>;
	searchForm: FormGroup;
	destroy$ = new Subject<any>();
	bugs2$!: Observable<IBugResponse[]>;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService) {

		this.searchForm = this.formBuilder.group({
			searchColTitle: '',
			searchColPriority: '',
			searchColReporter: '',
			searchColStatus: ''
		} as ISearchableBugsTable);
	}

	ngOnInit(): void {
		this.bugs$ = of(this.originalBugs);

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
		// const filterKeyMaps = {
		// 	title: 'searchColTitle',
		// 	priority: 'searchColPriority',
		// 	reporter: 'searchColReporter',
		// 	status: 'searchColStatus'
		// };
		const simpleStrIncludes = (val: string, checkAgainst: string) => val.includes(checkAgainst);
		const filterActions = {
			searchColTitle: simpleStrIncludes,
			searchColPriority: simpleStrIncludes,
			searchColReporter: simpleStrIncludes,
			searchColStatus: simpleStrIncludes
		} as { [id: string]: any } ;

		const checkNullOrEmpty = (checkStr: string) : boolean => checkStr != null && checkStr.trim() != '';

		let test$: Observable<IBugResponse[]>
		// this.bugs$
		 = combineLatest([
			of(this.originalBugs),
			searchForm$
		])
		.pipe(
			map(([originalBugs, searchForm]) => {
				return {
					originalBugs,
					searchForm
				};
			}),


			filter((val) => {
				const searchFormNonEmptyFields = Object.entries(val.searchForm)
				.filter(([key, value]) => checkNullOrEmpty(value))
				// .map(item => {
				// 	let dict : { [id: string]: string } = {};
				// 	dict[item[0]] = item[1];
				// 	return dict;
				// })
				;

				const filteredBugs = val.originalBugs.filter((item) => {
					let finalArrayResults = [];

					for (let i = 0; i < searchFormNonEmptyFields.length; i++) {
						type ObjectKey = keyof typeof item; // Dynamically access Dictionary in TypeScript

						const element = searchFormNonEmptyFields[i];

						debugger;
						let valueToTest = item[filterMaps[element[0]] as ObjectKey];

						// type ObjectKeyOfFilterActions = keyof typeof filterActions;
						const isMatchingElement : boolean = filterActions[element[0]](valueToTest, element[1]);
						if (isMatchingElement) {
							finalArrayResults.push(item);
							break;
						}
					}

					return finalArrayResults;
				});
				return val != null;
			}),
			map((val) => val.originalBugs)
		);

		this.bugs$.subscribe((val)=>{
			debugger;
		});

		// test$.subscribe((val)=>{

		// });

		// this.searchForm.get('searchColTitle')?.valueChanges
		// .pipe(
		// 	// To clear valueChanges
		// 	// takeUntil(this.destroy$),
		// 	debounceTime(400),
		// 	distinctUntilChanged(),
		// 	// This will take a val and switch to an endpoint of a choice
		// 	filter((val) => {
		// 		// this.onSearch(val)
		// 		return val === 1;

		// 	})
		// );

	}

	ngOnDestroy() {
		// this.destroy$.next();
		// this.destroy$.complete();

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
			"priority": 1,
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
