import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenbusinessmodalPage } from './openbusinessmodal';
import { CustomerProvider } from '../../../providers/customer/customer';
import { RecommendComponentModule } from '../../../components/shared/recommend/recommend.module';
import { OpenbusinessComponentModule } from '../../../components/shared/openbusiness/openbusiness.module';
import { TranslaterModule } from '../../../app/translate.module';
@NgModule({
  declarations: [
    OpenbusinessmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenbusinessmodalPage),OpenbusinessComponentModule,
    RecommendComponentModule,TranslaterModule,
  ],
  providers:[CustomerProvider]
})
export class OpenbusinessmodalPageModule {}
