import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  ModalOptions
} from 'ionic-angular';
import {
  TestDashboardPage
} from '../test-dashboard/test-dashboard';
import {
  HabitGetService
} from '../../services/habitget.service';
import {
  HabitPutService
} from '../../services/habitput.service';
import {
  HabitDetailsPage
} from '../habit-details/habit-details';
import {
  ModalCheckboxPage
} from '../modal-checkbox/modal-checkbox';
import {
  ResetStreakModalPage
} from '../reset-streak-modal/reset-streak-modal';
import {
  HabitCompletePage
} from '../habit-complete/habit-complete';
import {
  HabitRenewPage
} from '../habit-renew/habit-renew';
import {
  trigger,
  state,
  animate,
  transition,
} from '@angular/animations';
import * as moment from 'moment';
/**
 * Generated class for the HabitLandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habit-landing',
  templateUrl: 'habit-landing.html',
  providers: [
    HabitGetService,
    HabitPutService,
  ],
  animations: [
    trigger('checked', [
      transition('0 => 1', animate('5000ms ease-in')),
    ])
  ]
})

export class HabitLandingPage {
  habits: Array <any> ;
  testCheckboxOpen: boolean;
  testCheckboxResult: string;
  lateHabits: Array <any> ;
  resetHabits: Array <any>;
  expiredHabits: Array <object>;

  constructor(private habitGetService: HabitGetService,
    public habitPutService: HabitPutService,
    public navCtrl: NavController,
    private modal: ModalController,
    public navParams: NavParams
  ) {}

  createNewPage() {
    this.navCtrl.push(TestDashboardPage);
  }

  openModal() {
    const myModal = this.modal.create('ModalPage');
    myModal.present();
  }
  goToHabitDetails(habit) {
    const habitDetailsPage = this.modal.create(HabitDetailsPage, habit)
    habitDetailsPage.present();
  }

  loadHabits() {
    let today = moment();
     this.habitGetService.habitget().subscribe(
      (data) => {
        data.map(x => {
          x.checked = x.updatedAt === new Date(new Date().setHours(0,0,0,0)).toISOString();
        });
        this.habits = data;
        console.log(this.habits);

        this.lateHabits = this.habits.filter(habit => {
          var habitUpdatedAt = moment(habit.updatedAt).toISOString(true);
          var diff = today.diff(habitUpdatedAt, 'days');
          return diff === 2;
        });

        this.expiredHabits = this.habits.filter(habit => {
          return today.diff(moment(habit.startDate),'days') === 21;
        });

        // If there are late habits, wait before showing the 21 Day Progress Notice pop-up (if applicable)
        if(this.lateHabits.length === 0) { 
          let expiredHabit = this.expiredHabits.pop();
          console.log(expiredHabit);  
          let HabitRenewModal = this.modal.create(HabitRenewPage, { 
              expiredHabit
          });
          HabitRenewModal.present();
        } else { // If there are no late habits, then it is safe to show the 21 Day Progress Notice pop-up

        }

        


        this.resetHabits = this.habits.filter(habit =>{
          return today.diff(habit.updatedAt,'days') > 2
        });

      },
      (error) => {
        console.error(error)
      },
      () => {
        this.openCheckboxModal(this.lateHabits);
      }
    )
  }

  setHabitClass(habitCategory: string) {
    let classes = {
      'productivity': habitCategory === 'Productivity',
      'mental': habitCategory === 'Mental Wellness',
      'physical': habitCategory === 'Physical Health',
      'basic': habitCategory === 'The Basics'
    };
    return classes;
  }

  increment(habit) {
    let today = moment().startOf('day');
    if (habit.checked) {
      if (habit.streakCounter < 1) {
        return
      } else {
        habit.streakCounter -= 1;
        habit.updatedAt = today.subtract(1,'day').toDate();

        this.habitPutService.habitput(habit).subscribe(
          data => {
            habit.checked = false;
            habit.updatedAt = habit.updatedAt.toISOString();
          },
          error => {
            console.error(error);
          })
      }
    } else {
      habit.streakCounter += 1;
      habit.updatedAt = today.toDate();

      // If habit streak is 21 days, show congratulations modal
      if(habit.streakCounter === 21) {
        const myModalOptions: ModalOptions = {
          enableBackdropDismiss: false,
          showBackdrop: false
        };
        let habitCompleteModal = this.modal.create(HabitCompletePage, { habit }, myModalOptions);
          habitCompleteModal.present();
          habitCompleteModal.onDidDismiss((habit, action) => {

            // Instead of delete, will need to update to be archived 
            if(action === 'delete') {
              let deletedHabit = habit._id;

              // After a habit is deleted, remove it from the habits array
              this.habits = this.habits.filter((habit) => {
                return habit._id !== deletedHabit;
              });
            } 
            else {
              // If a user would like to keep tracking a habit, even after 21 days...

            }
        });
      }


      this.habitPutService.habitput(habit).subscribe(
        data => {
          habit.checked = true;
          habit.updatedAt = habit.updatedAt.toISOString();
        },
        error => {
          console.error(error)
        })
    }
  }

  animationStarted(habit) {
    habit.animating = true;
  }
  animationEnded(habit) {
    habit.animating = false
  }

  openCheckboxModal(habits) {
    if(habits.length<1){
      this.openResetModal(this.resetHabits);
      return
    }else{
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false,
        showBackdrop: false
      };
      const checkboxModal = this.modal.create(ModalCheckboxPage, {
        data: habits
      }, myModalOptions);
      checkboxModal.present();
      checkboxModal.onDidDismiss(() => {
        console.log("I have dismissed");
        this.openResetModal(this.resetHabits);
      });
    }
  }

  openResetModal(habits) {
    if(habits.length<1){
      return
    }else{
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false,
        showBackdrop: false
      };
      const resetModal = this.modal.create(ResetStreakModalPage, {
         data: habits
        }, myModalOptions);
      resetModal.present();
      resetModal.onDidDismiss((data) => {
        console.log("I have dismissed");
      });
    }
  }
  ionViewDidEnter() {
    this.loadHabits();
    console.log('ionViewDidLoad HabitLandingPage');
  }
}

//add to checkboxModal Dismiss(habit){
  //habit.map(habit =>
//if (habit.startdate-today)/21 === 0)
//open habit-renew modal
//}
//basically seeing if there is time passed divisible by 21 for any following sprints
