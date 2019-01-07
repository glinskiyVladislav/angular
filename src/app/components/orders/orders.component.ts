//@Получение заказа со стороны админа
import { Component, OnInit } from '@angular/core';
import { SalesService } from "../../services/sales.service";
import { Order } from "../../models/Order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    public salesService: SalesService
  ) { }

  ngOnInit() {
    // Get all orders
    this.salesService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    })
  }

  changeStatus(order){

  }

  saveChanges(order) {

  }

}
