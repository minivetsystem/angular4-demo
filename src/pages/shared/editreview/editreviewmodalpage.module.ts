import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditreviewmodalpagePage } from './editreviewmodalpage';
import { CustomerProvider } from '../../../providers/customer/customer';
@NgModule({
  declarations: [
    EditreviewmodalpagePage,
  ],
  imports: [
    IonicPageModule.forChild(EditreviewmodalpagePage),
  ],
  providers:[CustomerProvider]
})
export class EditreviewmodalpagePageModule {}
