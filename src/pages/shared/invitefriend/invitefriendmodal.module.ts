import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitefriendmodalPage } from './invitefriendmodal';
import { CustomerProvider } from '../../../providers/customer/customer';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    InvitefriendmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitefriendmodalPage),TranslaterModule,
  ],
  providers:[CustomerProvider]
})
export class InvitefriendmodalPageModule {}
