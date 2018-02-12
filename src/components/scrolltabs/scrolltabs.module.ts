import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ScrollTabsComponent } from './scrolltabs';
import {TranslaterModule} from '../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,TranslaterModule
	],
	declarations: [
		ScrollTabsComponent
	],
	exports: [
		ScrollTabsComponent
	]
})
export class ScrollTabsComponentModule {}