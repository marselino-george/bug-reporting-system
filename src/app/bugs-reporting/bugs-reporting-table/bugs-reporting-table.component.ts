import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'brs-bugs-reporting-table',
	templateUrl: './bugs-reporting-table.component.html',
	styleUrls: ['./bugs-reporting-table.component.scss']
})
export class BugsReportingTableComponent implements OnInit {

	// @Input() hasSearch!: boolean;
	// @Input() hasEdit!: boolean;
	// @Input() hasDelete!: boolean;
	@Input() data!: any[];
	@ContentChild('headers') headers!: TemplateRef<any>;
	@ContentChild('rows') rows!: TemplateRef<any>;

	constructor() { }

	ngOnInit(): void {
	}

}
