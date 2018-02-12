import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AnalysisComponent } from './analysis';
import { CompanyProvider } from '../../../providers/company/company';
@NgModule({
	imports: [
		IonicModule
	],
	declarations: [
		AnalysisComponent
	],
	exports: [
		AnalysisComponent
    ],
    providers:[CompanyProvider]
})
export class AnalysisComponentModule {}