import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpassmodalpagePage } from './forgotpassmodalpage';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
@NgModule({
  declarations: [
    ForgotpassmodalpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpassmodalpagePage),
  ],
  providers:[VendorServiceProvider]
})
export class ForgotpassmodalpagePageModule {}
