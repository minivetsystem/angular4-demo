import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddppldeptmodalPage } from './addppldeptmodal';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    AddppldeptmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddppldeptmodalPage),TranslaterModule,
  ],
  providers:[VendorServiceProvider]
})
export class AddppldeptmodalPageModule {}
