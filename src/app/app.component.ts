import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { SuccessPage } from '../pages/success/success';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { HabitLandingPage } from '../pages/habit-landing/habit-landing';
import { TabsPage } from '../pages/tabs/tabs';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TestDashboardPage } from '../pages/test-dashboard/test-dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Temporarily changing the rootPage to the categories page for testing purposes
  rootPage:any = TestDashboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,screenOrientation:ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.is('ios')){
        statusBar.overlaysWebView(true);
        statusBar.styleLightContent();
        statusBar.backgroundColorByName('white');
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      }

      splashScreen.hide();
    });
  }
}

