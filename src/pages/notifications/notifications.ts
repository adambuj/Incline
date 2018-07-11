import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifyTime: any;
  chosenHours: number;
  chosenMinutes: number;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public localNotifications: LocalNotifications
  ) {
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  timeChange(time){
    console.log(time, 'this is the time');
    this.chosenHours = time.hour;
    this.chosenMinutes = time.minute;
  }

  addNotifications(){
    let firstNotificationTime = new Date();
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes);
    let notification = {
      id: new Date().getTime(),
      title: 'Notification Title',
      text: 'Local notification text',
      at: firstNotificationTime,
      every: 'day'
    };
    console.log("notification to be scheduled: ", notification);
    if(this.platform.is('cordova')){
      this.localNotifications.schedule(notification);
      let alert = this.alertCtrl.create({
        title: 'Notification set',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  cancelAll() {
    this.localNotifications.cancelAll();
  }

}