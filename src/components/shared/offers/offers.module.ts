import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OffersComponent } from './offers';
import { CompanyProvider } from '../../../providers/company/company';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		OffersComponent
	],
	exports: [
		OffersComponent
    ],
    providers:[CompanyProvider,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class OffersComponentModule {}