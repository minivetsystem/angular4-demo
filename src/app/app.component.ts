import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../pages/utils';
import { TranslateService } from 'ng2-translate';
// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'HomePage';
  loggedIn = false;
  admin: boolean = false;
  csf: boolean = false;
  showsubmenu: boolean = false;
  showrolewise: boolean = false;
  pages: Array<{ title: string, component: any }>;
  language: string;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public event: Events,
    public translate: TranslateService,
  ) {
    this.initializeApp();
    this.listenToLoginEvents();
  }
  showchildmenu() {
    this.showsubmenu = !this.showsubmenu;
    console.log("submenu", this.showsubmenu);
  }
  createmenu() {
    console.log('createmenu');
    if (this.csf) {
      this.pages = Utils.getUserMenu();
      console.log('tupages', this.pages, this.csf);
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.language = localStorage.getItem('language') != '' ? localStorage.getItem('language') : "si";
      this.changeLanguage(this.language);

    });
  }
  changeLanguage(language) {
    if (language == 'si') {
      this.translate.use('si');
      this.platform.setDir('ltr', true);
      localStorage.setItem('language', language);
    } else if (language == 'ar') {
      this.platform.setDir('rtl', true);
      this.translate.use('ar');
      localStorage.setItem('language', language);
    }
    else {
      this.translate.use('en');
      this.platform.setDir('ltr', true);
      localStorage.setItem('language', language);
    }


  }
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {
    this.event.subscribe('user:login', () => {
      this.csf = true;
      this.createmenu();
      if (parseInt(localStorage.getItem('role_id')) != 3) {
        this.showrolewise = true;
      }

    });
  }
}