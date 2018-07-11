import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SuccessPage } from '../pages/success/success';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { HabitLandingPage } from '../pages/habit-landing/habit-landing';
import { TabsPage } from '../pages/tabs/tabs';
import { DiscoverPage } from '../pages/discover/discover';
import { HistoryPage } from '../pages/history/history';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MorePage } from '../pages/more/more';
import { ForgotPage } from '../pages/forgot/forgot';
import { WorkHabitsPage } from '../pages/work-habits/work-habits';
import { MentalHabitsPage } from '../pages/mental-habits/mental-habits';
import { PhysicalHabitsPage } from '../pages/physical-habits/physical-habits';
import { BasicHabitsPage } from '../pages/basic-habits/basic-habits';
import { AddPresetHabitPage } from '../pages/add-preset-habit/add-preset-habit';
import { TestDashboardPage } from '../pages/test-dashboard/test-dashboard';
import { HabitCompletePage } from '../pages/habit-complete/habit-complete';
import { HabitRenewPage } from '../pages/habit-renew/habit-renew';
import { SplashPage } from '../pages/splash/splash';

// Including http module for use on login page
import { HttpClientModule } from '@angular/common/http';

// Including Browser Animations module for animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Components
import {ComponentsModule} from '../components/components.module';


// Import Local Notifications
import { LocalNotifications } from '@ionic-native/local-notifications';
// import { LocalNotifications } from '../../node_modules/de.appplant.cordova.plugin.local-notification';

// Import Services
import { LoginService } from "../services/login.service";
import { EqualValidator } from '../pages/create-account/equal-validator.directive';
import { ForgotService } from '../services/forgot.service';
import { LogoutService } from '../services/logout.service';
import { ResetService } from '../services/reset.service';
import { MoreResetService } from '../services/morereset.service';
import { HabitPostService } from '../services/habitpost.service';
import { HabitPutService } from '../services/habitput.service';
import { HabitGetService } from '../services/habitget.service';
import { HabitDeleteService } from '../services/habitdelete.service';
import { ModalCheckboxPage } from '../pages/modal-checkbox/modal-checkbox';
import { ResetStreakModalPage } from '../pages/reset-streak-modal/reset-streak-modal';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SuccessPage,
    CreateAccountPage,
    EqualValidator,
    HabitLandingPage,
    TabsPage,
    DiscoverPage,
    MorePage,
    HistoryPage,
    NotificationsPage,
    TestDashboardPage,
    ForgotPage,
    WorkHabitsPage,
    MentalHabitsPage,
    PhysicalHabitsPage,
    BasicHabitsPage,
    AddPresetHabitPage,
    ModalCheckboxPage,
    ResetStreakModalPage,
    HabitCompletePage,
    HabitRenewPage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'bottom'}),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SuccessPage,
    CreateAccountPage,
    HabitLandingPage,
    TabsPage,
    DiscoverPage,
    MorePage,
    HistoryPage,
    NotificationsPage,
    TestDashboardPage,
    ForgotPage,
    WorkHabitsPage,
    MentalHabitsPage,
    PhysicalHabitsPage,
    BasicHabitsPage,
    AddPresetHabitPage,
    ModalCheckboxPage,
    ResetStreakModalPage,
    HabitCompletePage,
    HabitRenewPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    LoginService,
    SplashScreen,
    StatusBar,
    ScreenOrientation,
    LocalNotifications,
    ForgotService,
    LogoutService,
    ResetService,
    MoreResetService,
    HabitPostService,
    HabitGetService,
    HabitDeleteService,
    HabitPutService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HabitDeleteService,
  ]
})
export class AppModule {}
