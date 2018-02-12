import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import { CountryProvider } from '../../../providers/country/country';
import { SelectSearchableModule } from '../../../components/select/select-module';
import { AddpeoplePage } from './addpeople';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    AddpeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(AddpeoplePage),SelectSearchableModule,TranslaterModule
  ],
  providers: [VendorServiceProvider,CountryProvider]
})
export class AddpeoplePageModule {}
