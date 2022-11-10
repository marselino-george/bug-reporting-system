import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BugsReportingRoutingModule } from './bugs-reporting-routing.module';
import { BugsReportingShellComponent } from './bugs-reporting-shell/bugs-reporting-shell.component';
import { BugsReportingTableComponent } from './bugs-reporting-table/bugs-reporting-table.component';
import { BugPriorityPipe } from './bug-priority.pipe';
import { SharedDirectivesModule } from '@shared/directives/shared-directives.module';
import { BugsReportingDetailComponent } from './bugs-reporting-detail/bugs-reporting-detail.component';


@NgModule({
  declarations: [
    BugsReportingShellComponent,
    BugsReportingTableComponent,
    BugPriorityPipe,
    BugsReportingDetailComponent
  ],
  imports: [
    CommonModule,
	ReactiveFormsModule,
	BugsReportingRoutingModule,
	SharedDirectivesModule
  ]
})
export class BugsReportingModule { }
