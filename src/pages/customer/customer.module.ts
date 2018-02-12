import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPage } from './customer';
import { ProgressBarModule } from '../../components/progress-bar/progress-bar.module';
import { CustomerProvider } from '../../providers/customer/customer';
import { TranslaterModule } from '../../app/translate.module';
@NgModule({
  declarations: [
    CustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerPage),ProgressBarModule,TranslaterModule,
  ],
  providers:[CustomerProvider]
})
export class CustomerPageModule {}


