// @Деректива которая отслеживает события на элементе
import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: '[appShowDescription]'
})
export class ShowDescriptionDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }
//  Можно весить неограниченное количество событий
//  Повесить событие - onClick - это произвольное название. click - это событие которое нужно обработать
  @HostListener("click", ["$event"]) onClick(e: MouseEvent) {
   // получить событие - нужно передать ["$event"]
    console.log(e);

    // Варианты:
    //this.element.nativeElement.nextElementSibling
    //this.renderer.nextSibling(this.element.nativeElement)
    const description = this.element.nativeElement.nextElementSibling;
    const state = description.hidden;
    // Еще один метод отслеживать на нужном элементе событие
    this.renderer.listen(description,'click', (e) => {
      console.log('Click');
    });
    // this.renderer.setProperty(description, 'hidden', false);
    this.renderer.setProperty(description, 'hidden', !state);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeCursor('pointer');
  }

  changeCursor(type) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }
}
