import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TanstobankmodalPage } from './tanstobankmodal';
import { CustomerProvider } from '../../../providers/customer/customer';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    TanstobankmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(TanstobankmodalPage),TranslaterModule,
  ],
  providers:[CustomerProvider]
})
export class TanstobankmodalPageModule {}
