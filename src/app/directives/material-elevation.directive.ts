import { Directive, ElementRef, HostListener, Input, Renderer2, 
  OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMaterialElevation]'
})
export class MaterialElevationDirective {

  @Input() defaultElevation = 2
  @Input() raisedElevation = 8
  @Input() canSelect = false

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { 
    this.setElevation(this.defaultElevation)
    this.setCursorPointer()
  }

  ngOnChanges(_changes: SimpleChanges){
    this.setElevation(this.defaultElevation)
    this.setCursorPointer()
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setElevation(this.raisedElevation)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setElevation(this.defaultElevation)
  }

  setElevation(amount: number){
    // remove all elevation classes
    const classesToRemove = Array.from((<HTMLElement>this.element.nativeElement).classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.element.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${amount}`;
    this.renderer.addClass(this.element.nativeElement, newClass);
  }
  setCursorPointer(){
    if (this.canSelect){
      this.renderer.addClass(this.element.nativeElement, 'cursor-pointer')
    }
  }
}
