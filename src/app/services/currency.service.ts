//@Создать сервис
import { Injectable } from '@angular/core';
import { Currency } from "../models/Currency";
import { BehaviorSubject } from "rxjs";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency: Currency[] = [
    {
      name: 'USD',
      isActive: true,
      //На что умножать. Базовая сейчас долар
      coefficient: 1
    },
    {
      name: 'GBP',
      isActive: false,
      coefficient: 0.5
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 0.8
    }
  ];

  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  selectedCurrency = this.currencySource.asObservable();

  constructor() { }

  selectCurrency(name: string) {
    this.currency = this.currency.map((currency: Currency) => {
      currency.isActive = currency.name === name;
      return currency
    });
    this.currencySource.next(this.currency);
  }

}
