import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public minCharge: number;
  public maxCharge: number;
  public currentCharge: number;
  private subscription: any;

  constructor(public platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, public batteryStatus: BatteryStatus) {
    this.minCharge = 20;
    this.maxCharge = 99;
    this.currentCharge = 0;

    this.platform.ready().then( () => {
      // watch change in battery status
      this.subscription = this.batteryStatus.onChange().subscribe(
        (status: BatteryStatusResponse) => {

          this.currentCharge = status.level;

          if (status.level == this.maxCharge && status.isPlugged == true) {
            this.doAlert("Unplug your phone!!");
          } else if (status.level == this.minCharge && status.isPlugged == false) {
            this.doAlert("Plug your phone in!!");
          }
        }
      );
    });  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doAlert(msg: string) {
    console.log(msg);
    
    let alert = this.alertCtrl.create({
      title: 'Smart Charger',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
