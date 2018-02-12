import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddofferComponent } from './addoffer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingletonService } from '../../../providers/configservice';
import { TranslaterModule } from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule, ReactiveFormsModule, FormsModule, TranslaterModule
	],
	declarations: [
		AddofferComponent
	],
	exports: [
		AddofferComponent
	],
	providers: [AddofferComponent, File, Transfer, TransferObject, FilePath, Camera, SingletonService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AddofferComponentModule { }