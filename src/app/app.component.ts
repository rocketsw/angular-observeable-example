import { Component, VERSION, OnInit } from '@angular/core';
import {  Subject } from 'rxjs';

enum Action{
  Buy = 'BUY',
  Sell = 'SELL'
}
class Order{
  constructor(public orderId: number, public traderId: number,
      public stock: string, public shares: number, public action:Action)
  {}
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    const orders$ = new Subject<Order>();

    class Trader {
      constructor(private traderId:number, private traderName:string){}
    
      placeOrder(order: Order){
        orders$.next(order);
      }
    }

    const stockExchange = orders$.subscribe(
        ord => console.log(`Sending to stock exchange the order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));
    const tradeCommission = orders$.subscribe(
          ord => console.log(`Reporting to trade commission the order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));
    const trader = new Trader(1, 'Joe');
    const order1 = new Order(1, 1,'IBM',100,Action.Buy);
    const order2 = new Order(2, 1,'AAPL',100,Action.Sell);
    trader.placeOrder( order1);
    trader.placeOrder( order2);
  }
}
