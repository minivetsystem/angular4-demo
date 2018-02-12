import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, PopoverController, Events, MenuController, Platform, AlertController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { MoremenuPage } from '../moremenu/moremenu';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
// import {Utils} from '../utils';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileOpener } from '@ionic-native/file-opener';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
})
export class VendorPage {
  footertoggle: string;
  activetab = 0;
  componentType = 'Finance';
  pages: any;
  storageDirectory: string = '';
  tabs: IScrollTab[] = [
    {
      name: 'Offers'
    },
    {
      name: 'Persons'
    },
    {
      name: 'Department'
    },
    {
      name: 'Finance'
    }
  ];
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  constructor(private fileOpener: FileOpener, private localNotifications: LocalNotifications, public alertCtrl: AlertController, public events: Events, public navCtrl: NavController, private modal: ModalController, public popoverCtrl: PopoverController, private menu: MenuController, public platform: Platform, private transfer: Transfer, private file: File) {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        // this.storageDirectory = cordova.file.externalDataDirectory;
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      this.localNotifications.on('click', (notification, state) => {
        if (this.platform.is('ios')) {
          this.storageDirectory = cordova.file.documentsDirectory;
        }
        else if (this.platform.is('android')) {
          // this.storageDirectory = cordova.file.externalDataDirectory;
          this.storageDirectory = cordova.file.dataDirectory;
        }
        else {
          // exit otherwise, but you could add further types here e.g. Windows
          return false;
        }
        let json = JSON.parse(notification.data);
        this.fileOpener.open(this.storageDirectory + "available-categories.xlsx", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          .then(
          () => console.log('File is opened')
          )
          .catch(e => console.log('Error openening file', e));

      });


    });
    this.menu.enable(true);
    this.events.publish('user:login');
  }

  ionViewDidEnter() {
    // window.location.reload();
    this.events.publish('user:login');
    this.scrollTab.go2Tab(this.activetab);

  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    this.footertoggle = data.selectedTab.name;
    console.log(this.footertoggle);

  }
  /*
   Offer Form Page from fab button
   */
  add_offer() {
    this.navCtrl.push('AddofferPage');

  }
  add_people() {
    this.activetab = 1;
    this.navCtrl.push('AddpeoplePage');

  }


  departmentModal() {
    const add_dept = this.modal.create('DeptmodalpagePage');
    add_dept.present();
  }

  download_cats() {

    this.platform.ready().then(() => {

      const fileTransfer: TransferObject = this.transfer.create();

      const excelfilelocation = encodeURI("efile.xls");

      fileTransfer.download(excelfilelocation, this.storageDirectory + "efile.xlsx", true).then((entry) => {
        this.localNotifications.schedule({
          id: 1,
          text: 'Available Categories',
          sound: `${entry.toURL()}`,
          data: { 'uri': `${entry.toURL()}` }
        });
        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `File was successfully downloaded`,
          buttons: ['Ok']
        });

        alertSuccess.present();

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `Error downloading file. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    });

  }
  optionsPopover(event) {

    let popover = this.popoverCtrl.create(MoremenuPage, { '_token': localStorage.getItem('token'), '_userid': localStorage.getItem('user_id'), })
    popover.present({
      ev: event
    });

  }
}
