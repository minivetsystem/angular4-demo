import { Component } from '@angular/core';
import * as _ from 'lodash';
import { IonicPage, Loading, AlertController, PopoverController, Events, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { MoremenuPage } from '../moremenu/moremenu';
import { CustomerProvider } from '../../providers/customer/customer';
enum update { Qty = 1, Price, OfferId, OfferType };
@IonicPage()
@Component({
  selector: 'page-sellerpage',
  templateUrl: 'sellerpage.html',
})
export class SellerpagePage {
  // adddeptForm: any;
  loading: Loading;
  offerlist: Array<any> = [];
  selectedofferlist: Array<any> = [];
  default: Array<any> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  default2: Array<any> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  dynmcurr: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dynmcurrorg: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selecteddynmcurr: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selectedOfferState: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  postqtyarr: Array<any> = [];
  postpricearr: Array<any> = [];
  postoffersidarr: Array<any> = [];
  postoffertypearr: Array<any> = [];
  quantity: Array<any> = [];
  searchedtext: any;
  usercode: any;
  total = 0;
  inputtypetotal = 0;
  backupEvent: any;
  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private events: Events, public popoverCtrl: PopoverController, private customerservice: CustomerProvider, private toastCtrl: ToastController, public menu: MenuController) {
    this.events.publish('user:login');
    menu.enable(true);
    this.updateQty();
  }
  onChange(offerOId) {
    if (this.selectedofferlist.length > 0) {
      this.default2[_.findIndex(this.selectedofferlist, { 'id': offerOId })] = parseInt(this.default[_.findIndex(this.offerlist[0], { 'id': offerOId })]);
      this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerOId })] = parseInt(this.dynmcurr[_.findIndex(this.offerlist[0], { 'id': offerOId })]);
    }
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }
    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id })].offer_price) * parseInt(this.default2[item]));

    }
    this.total += this.inputtypetotal;

    console.log('seletedchange_upper', this.default2[_.findIndex(this.selectedofferlist, { 'id': offerOId })], offerOId);
    this.updatepostarr(this.default2[_.findIndex(this.selectedofferlist, { 'id': offerOId })], offerOId, update.Qty);
  }
  onSelectedOfferChange(offerid) {
    console.log('seletedchange', this.default2[_.findIndex(this.selectedofferlist, { 'id': offerid })], offerid);
    this.default[_.findIndex(this.offerlist[0], { 'id': offerid })] = parseInt(this.default2[_.findIndex(this.selectedofferlist, { 'id': offerid })]);
    this.dynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })] = this.selecteddynmcurr[_.findIndex(this.selectedofferlist[0], { 'id': offerid })];
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }
    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id })].offer_price) * parseInt(this.default2[item]));

    }
    this.total += this.inputtypetotal;
    this.updatepostarr(parseInt(this.default2[_.findIndex(this.selectedofferlist, { 'id': offerid })]), offerid, update.Qty);
  }
  onChangeCurr(i, offerid) {

    this.dynmcurr[i] = this.dynmcurr[i] * 1;
    if (isNaN(this.dynmcurr[i])) {
      if (_.findIndex(this.selectedofferlist, { 'id': offerid }) != -1) {
        this.selectedOfferState[offerid] = 0;
        this.removeselectedoffer(_.findIndex(this.selectedofferlist, { 'id': offerid }), offerid);
        this.presentToast('Invalid offer Price. Removing from selected offer..');

      }
      this.dynmcurr[i] = 0;
    } else {
      this.dynmcurrorg[i] = this.dynmcurr[i]
      this.dynmcurr[i] = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(this.dynmcurr[i]);

      this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })] = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(this.dynmcurrorg[i]);
      this.selectofferonChangeCurr(_.findIndex(this.selectedofferlist, { 'id': offerid }), offerid);

      this.updatepostarr(this.default2[_.findIndex(this.selectedofferlist, { 'id': offerid })], offerid, update.Price);
    }
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }
    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id })].offer_price) * parseInt(this.default2[item]));

    }
    this.total += this.inputtypetotal;

  }
  selectofferonChangeCurr(index, offerid) {
    console.log('selectedoffer_currncy event fired', parseInt(this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })]));
    if (isNaN(parseInt(this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })])) || parseInt(this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })]) == 0) {
      this.presentToast('Invalid offer Price. Removing offer..');
      this.selectedOfferState[offerid] = 0;
      this.removeselectedoffer(_.findIndex(this.selectedofferlist, { 'id': offerid }), offerid);
    }
    this.dynmcurrorg[parseInt(_.findIndex(this.selectedofferlist, { 'id': offerid }))] = parseInt(this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })]);
    this.dynmcurr[_.findIndex(this.offerlist[0], { 'id': offerid })] = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(parseInt(this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offerid })]));
    this.selecteddynmcurr[index] = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(parseInt(this.dynmcurrorg[parseInt(_.findIndex(this.selectedofferlist, { 'id': offerid }))]));
    this.dynmcurrorg[parseInt(_.findIndex(this.offerlist[0], { 'id': offerid }))] = 0;
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }
    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id })].offer_price) * parseInt(this.default2[item]));

    }
    this.total += this.inputtypetotal;
    this.updatepostarr(this.default2[_.findIndex(this.selectedofferlist, { 'id': offerid })], offerid, update.Price);

  }
  initializeItems(val) {

    if (val != '') {
      this.searchedtext = val;
      this.customerservice.getOfferList(localStorage.getItem('company_id'), val).then((result) => {
        this.offerlist.length = 0;

        if (result['offers'].length != 0) {
          console.log('init', result['offers']);
          this.offerlist.push(result['offers']);
        } else {
          this.offerlist.length = 0;
        }

        this.loading.dismiss();
      }, (err) => {
        // this.loading.dismiss();
        this.presentToast(err);
      });
    } else {
      this.offerlist.length = 0;
    }

  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.backupEvent = ev;
    this.showLoader('Fetching offers...');
    console.log('typing..', ev.target.value);
    let val = ev.target.value;
    if (val && val.trim() != '') {

      this.initializeItems(val);
    } else {
      this.loading.dismiss();
      this.offerlist.length = 0;
    }

  }
  clearclicked() {
    this.backupEvent.target.value = '';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerpagePage');

  }
  optionsPopover(event) {

    let popover = this.popoverCtrl.create(MoremenuPage, { '_token': localStorage.getItem('token'), '_userid': localStorage.getItem('user_id'), })
    popover.present({
      ev: event
    });


  }
  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  selectedoffer(offerId, offermainid) {
    if (this.offerlist[0][offerId].offer_bonus_type == 'dynamic' && parseInt(this.dynmcurr[_.findIndex(this.offerlist[0], { 'id': offermainid })]) == 0) {
      this.presentToast("\"" + this.offerlist[0][offerId].offer_title + "\"" + " Invalid offer price");
      return;
    }

    if (this.selectedOfferState[offerId] == 0) {

      this.selectedofferlist.push(this.offerlist[0][offerId]);

      this.selectedOfferState[offerId] = 1;
      this.default2[parseInt(_.findIndex(this.selectedofferlist, { 'id': offermainid }))] = parseInt(this.default[_.findIndex(this.offerlist[0], { 'id': offermainid })]);
      this.dynmcurrorg[_.findIndex(this.selectedofferlist, { 'id': offermainid })] = parseInt(this.dynmcurr[_.findIndex(this.offerlist[0], { 'id': offermainid })]);
      this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offermainid })] = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(parseInt(this.dynmcurr[_.findIndex(this.offerlist[0], { 'id': offermainid })]));
      this.addItempostArr(offermainid);
    } else {
      this.presentToast("\"" + this.offerlist[0][offerId].offer_title + "\"" + " Offer already seleted.");
    }
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }
    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id })].offer_price) * parseInt(this.default2[item]));

    }
    this.total += this.inputtypetotal;
    console.log('man', this.selectedofferlist);
    console.log('man qty', this.default2[_.findIndex(this.selectedofferlist, { 'id': offermainid })], offermainid);


  }
  removeselectedoffer(index, offerid) {
    this.selectedofferlist.splice(index, 1);
    console.log('selectedofferlist', this.selectedofferlist);
    this.selecteddynmcurr.splice(index, 1);
    this.dynmcurrorg.splice(index, 1);
    this.selectedOfferState[_.findIndex(this.offerlist[0], { 'id': offerid })] = 0;
    this.postoffersidarr.splice(index, 1);
    this.postoffertypearr.splice(index, 1);
    this.postpricearr.splice(index, 1);
    this.postqtyarr.splice(index, 1);
    this.total = 0;
    this.inputtypetotal = 0;
    for (var i: any = 0; i < this.dynmcurrorg.length; i++) {
      if (this.dynmcurrorg[i] > 0) {
        this.inputtypetotal += parseInt(this.dynmcurrorg[i]);
      }

    }

    for (let item in this.selectedofferlist) {

      this.total += (parseInt(this.offerlist[0][parseInt(_.findIndex(this.offerlist[0], { 'id': this.selectedofferlist[item].id }))].offer_price) * this.default2[parseInt(item)]);

    }
    this.total += this.inputtypetotal;

    console.log("QtyAdd", this.postqtyarr);
    console.log("OfferType", this.postoffertypearr);
    console.log("OfferPrice", this.postpricearr);
    console.log("Offer ID", this.postoffersidarr);
  }

  offerclose() {

    var purchaseoffer = {
      "user_code": this.usercode,
      "search_offer": this.searchedtext,
      "quantity": JSON.parse(JSON.stringify(this.postqtyarr)),
      "price": JSON.parse(JSON.stringify(this.postpricearr)),
      "offers": JSON.parse(JSON.stringify(this.postoffersidarr)),
      "offer_bonus_type": JSON.parse(JSON.stringify(this.postoffertypearr)),
      "total_amount": _.trim(_.replace(Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(this.total), '€', ''))
    }
    this.showLoader('submiting...');
    this.customerservice.purchaseOffer(purchaseoffer, localStorage.getItem('company_id')).then((result) => {
      console.log('return', result);
      if (result['status'] == false) {
        this.setVarstodefault();
        this.clearclicked();
        this.showAlert(result['message']);
      } else {
        this.showAlert(result['message']);
        this.setVarstodefault();
        this.clearclicked();

      }
      this.loading.dismiss();
    }, (err) => {

      this.presentToast(err);
    });

  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          // this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }
  // updatePostArray(val,index){}
  addItempostArr(offermainid) {

    /*add Qty */
    this.postqtyarr.push(this.default2[_.findIndex(this.selectedofferlist, { 'id': offermainid })]);
    /*add offer type */
    this.postoffertypearr.push(_.find(this.selectedofferlist, ['id', offermainid]).offer_bonus_type == "static" ? 'static' : 'dynamic');
    /*add price  */
    this.postpricearr.push(_.find(this.selectedofferlist, ['id', offermainid]).offer_bonus_type == "static" ?
      Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(parseInt(_.find(this.selectedofferlist, ['id', offermainid]).offer_price) * parseInt(this.default2[_.findIndex(this.selectedofferlist, { 'id': offermainid })])) :
      this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offermainid })]);
    /* add offer id */
    this.postoffersidarr.push(offermainid);

    console.log("QtyAdd", this.postqtyarr);
    console.log("OfferType", this.postoffertypearr);
    console.log("OfferPrice", this.postpricearr);
    console.log("Offer ID", this.postoffersidarr);
  }
  updatepostarr(qty, offermainid, type) {
    switch (type) {
      case update.Qty:
        /*update qty*/
        if (this.selectedofferlist.length > 0 && _.findIndex(this.selectedofferlist, { 'id': offermainid }) != -1) {
          this.postqtyarr[_.findIndex(this.selectedofferlist, { 'id': offermainid })] = _.find(this.selectedofferlist, ['id', offermainid]).offer_bonus_type == "static" ? qty : 1;
          // update price;
          this.postpricearr[_.findIndex(this.selectedofferlist, { 'id': offermainid })] = _.find(this.selectedofferlist, ['id', offermainid]).offer_bonus_type == "static" ?
            Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(parseInt(_.find(this.selectedofferlist, ['id', offermainid]).offer_price) * parseInt(this.default2[_.findIndex(this.selectedofferlist, { 'id': offermainid })])) :
            this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offermainid })];
          console.log("QtyUpdate", this.postqtyarr);
          console.log("PriceUpdate", this.postpricearr, _.find(this.selectedofferlist, ['id', offermainid]).offer_bonus_type);
        }
        break;
      case update.Price:
        /*update  price  */
        if (this.selectedofferlist.length > 0 && _.findIndex(this.selectedofferlist, { 'id': offermainid }) != -1) {
          this.postpricearr[_.findIndex(this.selectedofferlist, { 'id': offermainid })] = this.selecteddynmcurr[_.findIndex(this.selectedofferlist, { 'id': offermainid })];
          console.log("PriceUpdate", this.postpricearr, this.postoffertypearr);
        }
      default:
        break;
    }
  }

  setVarstodefault() {
    this.offerlist.splice(0);
    this.selectedofferlist.splice(0)
    this.default.splice(0)
    this.default2.splice(0)
    this.dynmcurr.splice(0)
    this.dynmcurrorg.splice(0)
    this.selecteddynmcurr.splice(0)
    this.selectedOfferState.splice(0)
    this.postqtyarr.splice(0)
    this.postpricearr.splice(0)
    this.postoffersidarr.splice(0)
    this.postoffertypearr.splice(0)
    this.quantity.splice(0)
    this.searchedtext = '';
    this.usercode = '';
    this.total = 0;
    this.inputtypetotal = 0;
    console.log('unset', this.selectedofferlist);
  }

  updateQty() {
    this.quantity = [
      {
        name: 'col1',
        options: [
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' }
        ]
      },
      {
        name: 'col2',
        options: [
          { text: '', value: '' },
          { text: '0', value: '0' },
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' }
        ]
      },
      {
        name: 'col3',
        options: [
          { text: '', value: '' },
          { text: '0', value: '0' },
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' }
        ]
      },
      {
        name: 'col4',
        options: [
          { text: '', value: '' },
          { text: '0', value: '0' },
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' }
        ]
      },
      {
        name: 'col5',
        options: [
          { text: '', value: '' },
          { text: '0', value: '0' },
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' }
        ]
      }
    ];
  }
}
