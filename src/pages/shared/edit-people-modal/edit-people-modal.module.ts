import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPeopleModalPage } from './edit-people-modal';
import { CountryProvider } from '../../../providers/country/country';
import { SelectSearchableModule } from '../../../components/select/select-module';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
  declarations: [
    EditPeopleModalPage
  ],
  imports: [
    IonicPageModule.forChild(EditPeopleModalPage),SelectSearchableModule,TranslaterModule,
  ],
  providers:[CountryProvider,VendorServiceProvider]
})
export class EditPeopleModalPageModule {}
