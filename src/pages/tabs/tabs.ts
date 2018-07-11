import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {HabitLandingPage} from '../habit-landing/habit-landing';
import {DiscoverPage} from '../discover/discover';
import {HistoryPage} from '../history/history';
import {NotificationsPage} from '../notifications/notifications';
import {MorePage} from '../more/more';
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  myHabitsRoot = HabitLandingPage
  discoverRoot = DiscoverPage
  historyRoot = HistoryPage
  notificationRoot = NotificationsPage
  moreRoot = MorePage


  constructor(public navCtrl: NavController) {}

}
