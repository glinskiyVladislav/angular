import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// @Подключение модуля формы в app module
// Регестрируется в imports - для работы с формами
import { FormsModule } from "@angular/forms";
// @Имопрт сервиса в app module
// Регестрируется в providers - для работы сервера - обмена данными между компонентами
import { JsonPlaceHolderService } from "./services/json-place-holder.service";

// @Подключение HttpClientModule для работы с запросами
// Регестрируеться в imports - для работы с запросами
// Вся работа с запросами только с сервисов
// В нужном сервисе нужно импортировать import { HttpClient } from "@angular/common/http"; и передать его в конструтор
// public http: HttpClient
import { HttpClientModule } from "@angular/common/http";

// @Подключение флеш модуля в app module - устанавливаеться через npm i
// В импорты FlashMessagesModule.forRoot()
// Для вывода сообщений - в нужной нам компоненте html добавить <flash-messages></flash-messages>
// В компоненту имортировать import { FlashMessagesService } from "angular2-flash-messages";
// В конструкторе зарегестрировать public flashMessage: FlashMessagesService
import { FlashMessagesModule } from "angular2-flash-messages";

// @Установка Firebase
// AngularFireModule - для работы с firebase; AngularFireModule.initializeApp(environment.firebase)
// AngularFirestoreModule - для работы с бд
// AngularFireAuthModule - для аутинтификации
// environment - там переменные среды
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

import { AppComponent } from './app.component';
import { TodoListComponentComponent } from './components/todo-list-component/todo-list-component.component';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { TodoItemComponentComponent } from './components/todo-item-component/todo-item-component.component';
import { NavbarComponentComponent } from "./components/navbar-component/navbar-component.component";
// import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutComponent } from "./components/about/about.component";
import { BooksService } from './services/books.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IdService } from './services/id.service';
import { AddBookComponent } from "./components/add-book/add-book.component";
import { EditBookComponent } from "./components/edit-book/edit-book.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PanelComponent } from "./components/panel/panel.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from "./services/auth.service";
// @Подключение pipe
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CurrencyComponent } from './components/currency/currency.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketService } from "./services/basket.service";
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  // declarations: [
  //   AppComponent,
  //   TodoListComponentComponent,
  //   FormComponentComponent,
  //   HomeComponentComponent,
  //   TodoItemComponentComponent,
  //   NavbarComponentComponent
  // ],
  declarations: [
    // Компоненты с прошлых уроков сделано для удобства деплоя
    TodoListComponentComponent,
    FormComponentComponent,
    HomeComponentComponent,
    TodoItemComponentComponent,
    NavbarComponentComponent,
    // Ниже компоненты к book store
    AppComponent,
    AboutComponent,
    AddBookComponent,
    EditBookComponent,
    NotFoundComponent,
    PanelComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CustomDatePipe,
    CurrencyComponent,
    BasketComponent,
    ClientHomeComponent,
    ClientCheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    // @Установка Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [JsonPlaceHolderService, BooksService, IdService, AuthService, BasketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
