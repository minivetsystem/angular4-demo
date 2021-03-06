import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EditofferComponent } from './editoffer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SingletonService } from '../../../providers/configservice';
import {TranslaterModule} from '../../../app/translate.module';
@NgModule({
	imports: [
		IonicModule,ReactiveFormsModule,FormsModule,TranslaterModule
	],
	declarations: [
		EditofferComponent
	],
	exports: [
		EditofferComponent
    ],
	providers:[File,Transfer,TransferObject,FilePath,Camera,SingletonService],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class EditofferComponentModule {}