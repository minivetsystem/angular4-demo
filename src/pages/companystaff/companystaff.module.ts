import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanystaffPage } from './companystaff';
import { ScrollTabsComponentModule } from '../../components/scrolltabs/scrolltabs.module';
import { OffersComponentModule } from '../../components/shared/offers/offers.module';
import { PersonsComponentModule } from '../../components/shared/persons/persons.module';
import { DepartmentsComponentModule } from '../../components/shared/departments/departments.module';
import { FinanceComponentModule } from '../../components/shared/finance/finance.module';
import { FinancebymonthComponentModule } from '../../components/shared/financebymonth/financebymonth.module';
import { AnalysisComponentModule } from '../../components/shared/analysis/analysis.module';
import { TranslaterModule } from '../../app/translate.module';
import { SingletonService } from '../../providers/configservice';
@NgModule({
  declarations: [
    CompanystaffPage,
  ],
  imports: [
    ScrollTabsComponentModule,
    OffersComponentModule,
    PersonsComponentModule,
    DepartmentsComponentModule,
    FinanceComponentModule,
    AnalysisComponentModule,
    FinancebymonthComponentModule,
    IonicPageModule.forChild(CompanystaffPage),
    TranslaterModule,
  ],
  providers:[SingletonService]
})
export class CompanystaffPageModule {}
