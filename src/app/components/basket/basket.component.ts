// @Создать  компоненту корзины
import { Component, OnInit } from '@angular/core';
import { BasketService } from "../../services/basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems = [];

  constructor(
    public basketService: BasketService
  ) { }

  ngOnInit() {
    // get all basket items
    this.basketService.getBusketItem().subscribe(items => {
      this.basketItems = items;
    });
  }

  clearBasket() {
    this.basketService.clearBasketAll();
  }

  deleteBasketItem(id) {
    this.basketService.deleteItem(id)
  }

}
