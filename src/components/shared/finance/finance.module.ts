import { NgModule,LOCALE_ID } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FinanceComponent } from './finance';
import { CompanyProvider } from '../../../providers/company/company';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		FinanceComponent
	],
	exports: [
		FinanceComponent
	],
	providers: [CompanyProvider, {provide: LOCALE_ID,useValue: 'it-IT'},
	],
    
})
export class FinanceComponentModule {}