import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DeleteHabitService } from '../../services/delete-habit.service';
/*
 * Generated class for the HabitCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habit-complete',
  templateUrl: 'habit-complete.html',
})
export class HabitCompletePage {
  habit: object;

  constructor(public viewCtrl: ViewController, private deleteHabitService: DeleteHabitService) {
    this.habit = this.viewCtrl.data.habit;
  }

  keepTracking() {
    this.viewCtrl.dismiss(this.habit, 'keep');
  }

  deleteHabit() {
    this.deleteHabitService.deleteHabit(this.habit).subscribe( (res) => {
      this.viewCtrl.dismiss(this.habit, 'delete');
    },(err) => {
      this.viewCtrl.dismiss(this.habit, 'delete');
    }
  );
  }

}
