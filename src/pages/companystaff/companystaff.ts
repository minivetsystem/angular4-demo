import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, ModalController, PopoverController, Events } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { MoremenuPage } from '../moremenu/moremenu';
@IonicPage()
@Component({
  selector: 'page-companystaff',
  templateUrl: 'companystaff.html',
})
export class CompanystaffPage {

  footertoggle: string;
  activetab = 0;
  componentType = 'Finance';
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
    },
  ];
  selectedTab: IScrollTab;
  menuenable: boolean = false;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  constructor(private events: Events, public menu: MenuController, public navCtrl: NavController, private modal: ModalController, public popoverCtrl: PopoverController) {
    this.events.publish('user:login');
    menu.enable(true);
  }

  ionViewDidEnter() {
    this.scrollTab.go2Tab(this.activetab);
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    this.footertoggle = data.selectedTab.name;
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
  optionsPopover(event) {
    let popover = this.popoverCtrl.create(MoremenuPage, { '_token': localStorage.getItem('token'), '_userid': localStorage.getItem('user_id'), })
    popover.present({
      ev: event
    });


  }

}
