import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { ProgressBarModule } from '../../../components/progress-bar/progress-bar.module';
// import { ChartModule } from 'angular2-highcharts';
// import * as highcharts from 'Highcharts';

import { CustomerProvider } from '../../../providers/customer/customer';
@NgModule({
  declarations: [
    AccountPage,
  ],
  // imports: [
  //   IonicPageModule.forChild(AccountPage),ProgressBarModule,ChartModule.forRoot(highcharts),ChartModule
  // ],
  imports: [
    IonicPageModule.forChild(AccountPage),ProgressBarModule,
  ],
  providers:[CustomerProvider]
})
export class AccountPageModule {}
