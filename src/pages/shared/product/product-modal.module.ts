import { NgModule ,LOCALE_ID} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModalPage } from './product-modal';
import { CustomerProvider } from '../../../providers/customer/customer';
import { PipesModule } from '../../../pipes/pipes.module';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    ProductModalPage
  ],
  imports: [
    PipesModule, IonicPageModule.forChild(ProductModalPage),TranslaterModule,
  ],
  providers:[CustomerProvider,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class ProductModalPageModule {}
