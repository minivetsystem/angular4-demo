import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditOfferPage } from './editoffer';
import {EditofferComponentModule} from '../../../components/shared/editoffer/editoffer.module';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    EditOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(EditOfferPage),EditofferComponentModule,TranslaterModule,
  ],
})
export class EditofferPageModule {}
