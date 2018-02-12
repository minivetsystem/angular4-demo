import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerpagePage } from './sellerpage';
import { MultiPickerModule } from 'ion-multi-picker';
import { CustomerProvider } from '../../providers/customer/customer';
import {TranslaterModule} from '../../app/translate.module';
@NgModule({
  declarations: [
    SellerpagePage,
  ],
  imports: [
    IonicPageModule.forChild(SellerpagePage),MultiPickerModule ,TranslaterModule,
  ],
  providers:[CustomerProvider,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class SellerpagePageModule {}
