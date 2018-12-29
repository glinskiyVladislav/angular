import { NgModule } from '@angular/core';
//@Импорт Router module и Routes
import { RouterModule, Routes } from "@angular/router";

//@Импорт компонент которые участвуют в маршрутизации
import { PanelComponent } from "./components/panel/panel.component";
import { AboutComponent } from "./components/about/about.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { EditBookComponent } from "./components/edit-book/edit-book.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/login/login.component";
// @Добавление защиты на роуты
import { AuthGuard } from "./guard/auth.guard";
import { RegisterComponent } from "./components/register/register.component";

//@Создание коллекции маршрутов
// Переход по главной странице это пустая строка
const routes: Routes = [
  // @Добавление защиты на роуты canActivate:[AuthGuard] - добавлять на страници где нельзя заходить без регистрации
  // pathMatch: 'full' - что б путь полностью соответствовал указаному
  { path: '', redirectTo:'panel', pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate:[AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate:[AuthGuard] },
  { path: 'addbook', component: AddBookComponent, canActivate:[AuthGuard] },
  //:параметр роута который можно потом забрать - название любое - @Пример написания роута с id
  { path: 'books/:id', component: EditBookComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  // Если пользователь зашел на любую страницу кроме тех что описаны
  { path: '**', component: NotFoundComponent },
];

//@Инициализация в NgModule коллекции маршрутов
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
//  @Регистрация зашиты
  providers: [AuthGuard]
})
export class AppRoutingModule { }
