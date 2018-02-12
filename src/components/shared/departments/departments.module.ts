import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DepartmentsComponent } from './departments';
import { CompanyProvider } from '../../../providers/company/company';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		DepartmentsComponent
	],
	exports: [
		DepartmentsComponent
    ],
    providers:[CompanyProvider]
})
export class DepartmentsComponentModule {}