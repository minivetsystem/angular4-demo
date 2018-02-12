import { NgModule ,LOCALE_ID} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleProductModalPage } from './singleproduct-modal';
import { CustomerProvider } from '../../../providers/customer/customer';
import { PipesModule } from '../../../pipes/pipes.module';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    SingleProductModalPage
  ],
  imports: [
    PipesModule, IonicPageModule.forChild(SingleProductModalPage),TranslaterModule
  ],
  providers:[CustomerProvider,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class SingleProductModalPageModule {}
