import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconOnHoverDirective } from './icon-on-hover.directive';
import { BoldOnHoverDirective } from './bold-on-hover.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	IconOnHoverDirective,
	BoldOnHoverDirective
  ],
  exports:[
	IconOnHoverDirective,
	BoldOnHoverDirective
  ]
})
export class SharedDirectivesModule { }
