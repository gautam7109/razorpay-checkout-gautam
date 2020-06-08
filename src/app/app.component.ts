import { Component,NgZone } from '@angular/core';
import { ICustomWindow, WindowService } from './window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularrozerpay';
  private _window: ICustomWindow;
  public rzp: any;
  public options: any = {
    key: 'rzp_test_07wzhNrs9Qhhf9',
    name: 'Gautam Singh',
    description: 'Shopping',
    amount: 1000000,
    prefill: {
      name: 'Gautam Singh',
      email: 'gautam7109@gmail.com',
    },
    notes: {},
    theme: {
      color: '#528FF0',
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: () => {
        this.zone.run(() => {
          alert('Payment Failed. Try again !');
        });
      },
    },
  };

  constructor(private zone: NgZone, private winRef: WindowService) {
    this._window = this.winRef.nativeWindow;
  }

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any): void {
    this.zone.run(() => {
      console.log(res);
      alert('Payment successfull');
    });
  }
}
