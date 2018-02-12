import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorPage } from './vendor';
import { ScrollTabsComponentModule } from '../../components/scrolltabs/scrolltabs.module';
import { OffersComponentModule } from '../../components/shared/offers/offers.module';
import { PersonsComponentModule } from '../../components/shared/persons/persons.module';
import { DepartmentsComponentModule } from '../../components/shared/departments/departments.module';
import { FinanceComponentModule } from '../../components/shared/finance/finance.module';
import { FinancebymonthComponentModule } from '../../components/shared/financebymonth/financebymonth.module';
import { AnalysisComponentModule } from '../../components/shared/analysis/analysis.module';
import { SingletonService } from '../../providers/configservice';
import {TranslaterModule} from '../../app/translate.module';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileOpener } from '@ionic-native/file-opener';
@NgModule({
  declarations: [
    VendorPage ,
  ],
  imports: [
    ScrollTabsComponentModule,
    OffersComponentModule,
    PersonsComponentModule,
    DepartmentsComponentModule,
    FinanceComponentModule,
    AnalysisComponentModule,
    FinancebymonthComponentModule,
    IonicPageModule.forChild(VendorPage),
    TranslaterModule,
  ],
  providers:[SingletonService,Transfer, TransferObject, File,LocalNotifications,FileOpener]
})
export class VendorPageModule {}
