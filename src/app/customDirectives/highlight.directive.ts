//! This is just an example for a custom directive.

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-highlight]',
})
export class HighlightDirective {
  private hoverColor = 'yellow';
  private originalColor: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.originalColor = this.element.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.hoverColor
    );
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.originalColor
    );
  }
}
