import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';
import { IBugResponse, ICommentResponse, IReporterResponse } from '../models/ibugresponse.model';

@Component({
	selector: 'brs-bugs-reporting-shell',
	templateUrl: './bugs-reporting-shell.component.html',
	styleUrls: ['./bugs-reporting-shell.component.scss']
})
export class BugsReportingShellComponent implements OnInit {


	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	bugs: IBugResponse[] = [
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
