// Урок 11
// @Структура файла дерективы -  каждая деректива это отдельный файл должен быть
// @Деректива которая что то меняет
import { Directive } from '@angular/core';
// Это нужно импортировать
import { ElementRef, Renderer2, Input } from "@angular/core";
// ElementRef - будет представлять наш элемент к которому мы применим нашу дерективу
// Renderer2 - это сервис который дает возможность манипулировать элементами
// Декоратор Input для того что бы определить принимаемые параметры
//appCustomColor - это название если захочеться директиву использовать тегом
@Directive({
  selector: '[appCustomColor], appCustomColor'
})
export class CustomColorDirective {
  // color переменная для второго примера установки значения - он должен быть
  // непосредственно в самое компоненте элемента
  color = "yellow";
  // Если ожидаеться приём нового параметра message
  @Input() message;

  // Количество параметров не ограничено и должно идти после названия дерективы
  // + все новые параметры должны записываться через @Input как выше

  // Конструктор должен принимать два аргумента
  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    // Для дефолтного значения с вызовом appCustomColor. Если заточено под ввод значения
    // то дефолтное значение что ниже не сработает
    // Сработает только в том случае если передать параметр которого не существует
    this.renderer.setStyle(this.element.nativeElement, "color", "red");
  }

  // для получения второго параметра нужно создать ngOnInit
  ngOnInit() {
    this.element.nativeElement.textContent += this.message;
  }

  // в input передаеться название компоненты
  // newColor(color) - название метода - своё. И принимет то что передали с html
  @Input("appCustomColor") set newColor(color) {
    this.renderer.setStyle(this.element.nativeElement, "color", color);
  }

}
