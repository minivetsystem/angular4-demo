import { NgModule ,LOCALE_ID} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialsharemodalmodalPage } from './socialsharemodal';
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    SocialsharemodalmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialsharemodalmodalPage),
  ],
  providers:[SocialSharing,{provide: LOCALE_ID,useValue: 'it-IT'}]
})
export class SocialsharemodalmodalPageModule {}
