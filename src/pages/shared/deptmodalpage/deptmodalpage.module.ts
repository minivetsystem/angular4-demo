import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptmodalpagePage } from './deptmodalpage';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import { TranslaterModule } from '../../../app/translate.module';
@NgModule({
  declarations: [
    DeptmodalpagePage,
  ],
  imports: [
    IonicPageModule.forChild(DeptmodalpagePage),TranslaterModule,
  ],
  providers:[VendorServiceProvider]
})
export class DeptmodalpagePageModule {}
