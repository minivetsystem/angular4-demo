import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { CountryProvider } from '../../providers/country/country';
import { SelectSearchableModule } from '../../components/select/select-module';
import {TranslaterModule} from '../../app/translate.module';
@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),SelectSearchableModule,TranslaterModule
  ],
  providers: [AuthService,CountryProvider]
})
export class RegisterPageModule {}
