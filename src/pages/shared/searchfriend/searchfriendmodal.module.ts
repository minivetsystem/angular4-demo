import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchfriendmodalPage } from './searchfriendmodal';
import { CustomerProvider } from '../../../providers/customer/customer';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    SearchfriendmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchfriendmodalPage),TranslaterModule,
  ],
  providers:[CustomerProvider]
})
export class SearchfriendmodalPageModule {}
