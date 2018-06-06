import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { physicalHabits } from '../../app/data/habits';
import { TabsPage } from '../tabs/tabs';
import { AddPresetHabitPage } from '../add-preset-habit/add-preset-habit';

/**
 * Generated class for the PhysicalHabitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-physical-habits',
  templateUrl: 'physical-habits.html',
})
export class PhysicalHabitsPage {

  physicalHabits: Array<any> = physicalHabits;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalHabitsPage');
  }

  goToDiscover(){
    this.navCtrl.pop();
  }

  goToCreateHabit(physicalHabit){
    this.navCtrl.push(AddPresetHabitPage, {
      'habit': physicalHabit.habit,
      'reminder': physicalHabit.reminder,
      'currentColor': physicalHabit.currentColor,
      'habitCategory': physicalHabit.habitCategory
    });

  }

}
