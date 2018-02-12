import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar';
import { TranslaterModule } from '../../app/translate.module';
@NgModule({
	declarations: [ProgressBarComponent],
	imports: [TranslaterModule],
	exports: [ProgressBarComponent]
})
export class ProgressBarModule {}