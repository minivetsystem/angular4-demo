import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddofferPage } from './addoffer';
import {AddofferComponentModule} from '../../../components/shared/addoffer/addoffer.module';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    AddofferPage,
  ],
  imports: [
    IonicPageModule.forChild(AddofferPage),AddofferComponentModule,TranslaterModule,
  ],
})
export class AddofferPageModule {}
