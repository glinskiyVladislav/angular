//@Структура структурной дерктивы
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";
// TemplateRef - это шаблон который будет использоваться для создания view
// ViewContainerRef - это контейнер содержащий view
// Каждый контейнер привязывается к элементу разметки

@Directive({
  selector: '[customIf]'
})
export class CustomIfDirective {

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input("customIf") set myValue(condition) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}
