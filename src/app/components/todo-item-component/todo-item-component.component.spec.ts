import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponentComponent } from './todo-item-component.component';

describe('TodoItemComponentComponent', () => {
  let component: TodoItemComponentComponent;
  let fixture: ComponentFixture<TodoItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
