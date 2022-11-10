import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[iconOnHover]',
	standalone: true
})
export class IconOnHoverDirective {

	@Input() iconOnHover!: string[];
	@Input('iconOnLeave') iconOnLeave!: string[];

	constructor(private renderer: Renderer2, private element: ElementRef) { }

	@HostListener('mouseenter') onMouseEnter() {

		for (let i = 0; i < this.iconOnLeave.length; i++) {
			const cssClass = this.iconOnLeave[i];
			this.renderer.removeClass(this.element.nativeElement, cssClass);
		}
		for (let i = 0; i < this.iconOnHover.length; i++) {
			const cssClass = this.iconOnHover[i];
			this.renderer.addClass(this.element.nativeElement, cssClass);
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		// this.renderer.removeClass(this.element.nativeElement, this.iconOnHover);
		// this.renderer.addClass(this.element.nativeElement, this.iconOnLeave);
		for (let i = 0; i < this.iconOnHover.length; i++) {
			const cssClass = this.iconOnHover[i];
			this.renderer.removeClass(this.element.nativeElement, cssClass);
		}
		for (let i = 0; i < this.iconOnLeave.length; i++) {
			const cssClass = this.iconOnLeave[i];
			this.renderer.addClass(this.element.nativeElement, cssClass);
		}
	}
}
