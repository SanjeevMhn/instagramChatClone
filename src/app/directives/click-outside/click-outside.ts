import { Directive, ElementRef, EventEmitter, Host, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutside {

  @Output() public clickOutside = new EventEmitter()
  constructor(private elementRef: ElementRef<HTMLElement>) { }

  @HostListener('document:click', ['$event'])
  public onClick(event:PointerEvent){
    const clickInside = this.elementRef.nativeElement.contains(event.target as HTMLElement)

    if(!clickInside){
      this.clickOutside.emit()
    }
  }

}
