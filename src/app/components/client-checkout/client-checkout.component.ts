//@Оформление заказа
import { Component, OnInit } from '@angular/core';
import { BasketService } from "../../services/basket.service";
import { Router } from "@angular/router";
import { SalesService } from "../../services/sales.service";

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {
  // Пользователю
  checkoutList;
  // Админу
  name = '';
  phone = '';
  email = '';
  addressIsVisible = false;
  totalSum = 0;

  constructor(
    public basketService: BasketService,
    public salesService: SalesService,
    public router: Router
  ) { }

  ngOnInit() {
    // get all basket items
    this.basketService.getBusketItem().subscribe(items => {
      if (!items.length) {
        this.router.navigate(['/']);
      } else {
        this.checkoutList = items;
        this.totalSum = this.checkoutList.reduce((sum, item) => sum += item.sum, 0)
      }
    });
  }

  onChangeItemCount(item) {
    this.totalSum = this.checkoutList.reduce((sum, item) => sum += item.sum, 0)
  }

  deleteItem(id) {
    this.basketService.deleteItem(id);
  }

  onSubmit() {
    const newOrder = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      items: this.checkoutList,
      status: 'processing'
    };

    this.salesService.addNewOrder(newOrder)
      .then(() => {
        this.router.navigate(['/']);
        //show message о успешном добавлении товара
      });
  }
}
