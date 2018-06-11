import { Component, OnInit,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Slides } from 'ionic-angular/components/slides/slides';
import { TabsPage } from '../tabs/tabs';
import * as moment from 'moment';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})

export class ModalPage implements OnInit {
  private startDate: Date|moment.Moment;
  private minDateOfPicker: String;
  private maxDateOfPicker: String;
  target: string;
  habit;
  reminder;
  currentColor:string;
  habitCategory:string;
  
  @ViewChild('modalSlider')slides:Slides;
  public category: string;
  public name:string;
  public page:number=1;
  public habitName: string='';

  ngOnInit() {
    this.category = '';
    this.name = this.name == null ? '' : this.name;
    this.page = 1;
    console.log(this.name+ 1);

  }
  ngAfterViewInit() {
    // child is set
    this.slides.lockSwipes(true);
    console.log(this.name+ 2);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.name = this.navParams.get('habit');
  }
  closeModal(){
    this.view.dismiss();
  }
  onNamePicked(name){
    this.name = name;
  }
  onCategorySelected(category) {
    this.category = category;
    localStorage.setItem("category", category);
    // Navigate to the next page (hasn't been created yet -- next sprint)
    //this.navCtslideNexttPage);
  }
  getSlideNumber(){
    this.page = this.slides.getActiveIndex()+1;
  }

  // Go back to previous page. If the user is on the first page of the modal, the modal closes
  goBack(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
  nextPage(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  goToHabitLandingPage(){
    this.navCtrl.push(TabsPage);
  }


}
