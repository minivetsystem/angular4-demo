import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OpenbusinessComponent } from './openbusiness';
import { CompanyProvider } from '../../../providers/company/company';
import { TranslaterModule } from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		OpenbusinessComponent
	],
	exports: [
		OpenbusinessComponent
    ],
    providers:[CompanyProvider]
})
export class OpenbusinessComponentModule {}