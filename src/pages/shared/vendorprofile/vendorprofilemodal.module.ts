import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorProfileModalPage } from './vendorprofilemodal';
import { CountryProvider } from '../../../providers/country/country';
import { SelectSearchableModule } from '../../../components/select/select-module';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SingletonService } from '../../../providers/configservice';
@NgModule({
  declarations: [
    VendorProfileModalPage
  ],
  imports: [
    IonicPageModule.forChild(VendorProfileModalPage),SelectSearchableModule,
  ],
  providers:[CountryProvider,VendorServiceProvider,File,Transfer,TransferObject,FilePath,Camera,SingletonService]
})
export class VendorProfileModalPageModule {}
