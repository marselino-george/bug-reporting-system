import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[boldOnHover]',
	standalone: true
})
export class BoldOnHoverDirective {

	@Input() underline: boolean = false;

	constructor(private renderer: Renderer2, private element: ElementRef) {

	}

	@HostListener('mouseenter') onMouseEnter() {
		this.renderer.setStyle(this.element.nativeElement, 'font-weight', 'bold');
		if (this.underline)
			this.renderer.setStyle(this.element.nativeElement, 'text-decoration', 'underline');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.renderer.setStyle(this.element.nativeElement, 'font-weight', 'normal');
		if (this.underline)
			this.renderer.removeStyle(this.element.nativeElement, 'text-decoration');
	}
}
