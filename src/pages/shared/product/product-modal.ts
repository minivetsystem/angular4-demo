//back
import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { CustomerProvider } from '../../../providers/customer/customer';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.html',
})

export class ProductModalPage {
  information: any;
  loading: any;
  tabsactive = {
    activetabid: 0,
    activetabcompanyid: ''
  }
  showinfioffers:boolean=true;
  remainingpags:number=1;
  constructor(public shareit: ModalController, public navCtrl: NavController, public customerservice: CustomerProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public alertCtrl: AlertController, private view: ViewController) {
    //  this.information = navParams.get('provider');
    this.loading = navParams.get('loderobj');
    this.customerservice.getProviderlist(navParams.get('data')).then((result) => {
      this.loading.dismiss();
      if (result['status']) {
        // if have some offer
        this.information = result['companies'];
      } else {
        this.showAlert(result['message']);
      }
      console.log(result);
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
    // console.log('offers', navParams.get('data'));
  }
  toggleSection(i, companyid) {
    //console.log(this.information[i]);
    // console.log('toggle'+ this.information[i].department_name);
    this.information[i].open = !this.information[i].open;
    if (this.information[i].open) { this.showLoader('Loading...'); }
    this.tabsactive.activetabcompanyid = companyid;
    this.tabsactive.activetabid = i;
    this.customerservice.getOfferslist(this.navParams.get('data'), companyid,this.remainingpags).then((result) => {

      if (result['status']) {
        // if have some offers
        this.information[i].offers = result['offers'];
        this.information[i].cofferlength = isset(() => Object.keys(result['offers'].length)) ? 1 : 0;
      }
      if (this.loading) {
        this.loading.dismiss();
      }

      console.log(result);
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });

  }
  ShareIt(firstparam, secondparam, bonustype, offerid) {
    var sharedata = {
      'firstparam': firstparam,
      'secondparam': secondparam,
      'bonustype': bonustype,
      'offerid': offerid
    }
    let profileModal = this.shareit.create('SocialsharemodalmodalPage', { data: sharedata });
    profileModal.present();
  }
  singleofferpage(offerid) {
    if (this.loading) { this.loading.dismiss(); }
    let singleproduct = this.shareit.create('SingleProductModalPage', { offerID: offerid });
    singleproduct.present();
  }
  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        this.remainingpags =this.remainingpags+1;
        this.customerservice.getOfferslist(this.navParams.get('data'), this.tabsactive.activetabcompanyid,this.remainingpags).then((result) => {
          //this.showinfioffers
          if (result['status']) {
            // if have some offers
            var oldvalue = this.information[this.tabsactive.activetabid].offers
           this.information[this.tabsactive.activetabid].offers = _.concat(oldvalue, result['offers']);
            // this.information[this.tabsactive.activetabid].cofferlength = isset(() => Object.keys(result['offers'].length)) ? 1 : 0;
          }else {
            this.showinfioffers=false;
          }
         

          console.log(result);
        }, (err) => {
          this.loading.dismiss();
          console.log("Observable Instance error :", err)
        });
        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }
  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }
  ionViewWillLeave() { this.loading.dismiss(); }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }

  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  dismiss() {
    // var obj = this.navParams.get('loderobj');
    // console.log('lu',obj.dismiss(),obj);
    this.view.dismiss();
  }
}
/*
UDF : Check Object has property
*/
function isset(fn: () => any) {
  let result;
  try {
    result = fn();
  } catch (ex) {
    result = undefined;
  } finally {
    return result !== undefined;
  }

}
