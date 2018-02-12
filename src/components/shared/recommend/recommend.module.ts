import { NgModule,LOCALE_ID } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RecommendComponent } from './recommend';
import { CompanyProvider } from '../../../providers/company/company';
import { TranslaterModule } from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		RecommendComponent
	],
	exports: [
		RecommendComponent
    ],
    providers:[CompanyProvider,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class RecommendComponentModule {}