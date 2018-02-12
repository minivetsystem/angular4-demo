import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule , Http} from '@angular/http';
import { MyApp } from './app.component';
import { SelectSearchableModule } from '../components/select/select-module';
import { VendorServiceProvider } from '../providers/vendor-service/vendor-service';
import { SingletonService } from '../providers/configservice';
import { HomePageModule } from '../pages/home/home.module';
import { MoremenuPageModule} from '../pages/moremenu/moremenu.module';
import { CustomerProvider } from '../providers/customer/customer';  
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,HttpClientModule, HttpModule,SelectSearchableModule,HomePageModule,MoremenuPageModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
})
  ],
  exports: [TranslateModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,SingletonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VendorServiceProvider,
    CustomerProvider,
  ]
})
export class AppModule {}
