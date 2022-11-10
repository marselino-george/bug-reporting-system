import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconOnHoverDirective } from './icon-on-hover.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	IconOnHoverDirective
  ],
  exports:[
	IconOnHoverDirective
  ]
})
export class SharedDirectivesModule { }
