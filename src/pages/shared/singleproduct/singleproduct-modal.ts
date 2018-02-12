//back
import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { IonicPage,NavController, NavParams, LoadingController, ToastController, AlertController, ViewController,ModalController } from 'ionic-angular';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'singleproduct-modal',
  templateUrl: 'singleproduct-modal.html',
})

export class SingleProductModalPage {
  addreviewForm: any;
 loading:any;
offermetatab = 'desc';
offeritem={
'product_name':'',
'brand_name':'',
'offerID':'',
'desc':'',
'seller_comp':'',
'offer_price':0,
'share':0.00,
'earning':0,
'offer_bonus_type':'',
'show_buy_button':'',
'images':[],
'characteristics':[],
'offer_bonus':0.00,
'offer_title':'',
'aditional_informations':'',
'delivery_and_warranty':'',
'specifications':''
}
review:Array<any>=[];
loggedinuserid:any;
  constructor(public shareit: ModalController,public navCtrl: NavController, public customerservice: CustomerProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public alertCtrl: AlertController, private view: ViewController,private formBuilder: FormBuilder) {
    this.addreviewForm = this.formBuilder.group({
      'reviewcontent': ['', Validators.required]
    });
  this.showLoader('Loading...');
  this.customerservice.getSingleOffer(navParams.get('offerID')).then((result:any) => {
  this.loggedinuserid = localStorage.getItem('user_id');
   if(result['status']){
    this.offeritem.product_name = result.offer.product_name;
    this.offeritem.brand_name = result.offer.brands.name;
    this.offeritem.offerID = result.offer.id;
    this.offeritem.desc = result.offer.offer_description;
    this.offeritem.seller_comp = result.offer.company.company_name;
    this.offeritem.offer_price = result.offer.offer_price;
    this.offeritem.offer_bonus_type = result.offer.offer_bonus_type;
    this.offeritem.share = (result.offer.offer_bonus_type=='static'? (result.offer.offer_bonus/result.offer.offer_price):(result.offer.offer_bonus/100));
    this.offeritem.earning = result.offer.offer_bonus;
    this.offeritem.show_buy_button = result.offer.show_buy_button;
    for(let item in result.offer.images){
      this.offeritem.images.push(result.offer.images[item]);
      // console.log('myitem',result.offer.images[item].file_name);
    }
 
    this.offeritem.characteristics.push(result.offer.characteristics);
    this.offeritem.offer_bonus = result.offer.offer_bonus;
    this.offeritem.offer_title = result.offer.offer_title;
    this.offeritem.aditional_informations =result.offer.aditional_informations;
    this.offeritem.delivery_and_warranty=result.offer.delivery_and_warranty;
    this.offeritem.specifications=result.offer.specifications;
    this.getReviews();
    this.loading.dismiss();
   } else {
     this.showAlert(result['message']);
   }
   console.log('trimed',this.offeritem);
 }, (err) => {
   this.loading.dismiss();
   console.log("Observable Instance error :", err)
 });
    // console.log('offers', navParams.get('data'));
    }
  // toggleSection(i,companyid) {
  //   //console.log(this.information[i]);
  //   // console.log('toggle'+ this.information[i].department_name);
  //   this.information[i].open = !this.information[i].open;
  //   if (this.information[i].open) { this.showLoader('Loading...'); }
   
  //   this.customerservice.getOfferslist(this.navParams.get('data'),companyid).then((result) => {
     
  //     if (result['status']) {
  //       // if have some offers
  //       this.information[i].offers = result['offers'];
  //       this.information[i].cofferlength = isset(() => Object.keys(result['offers'].length)) ? 1 : 0;
  //     }
  //     if(this.loading){
  //       this.loading.dismiss();
  //     }
      
  //     console.log(result);
  //   }, (err) => {
  //     this.loading.dismiss();
  //     console.log("Observable Instance error :", err)
  //   });

  // }
  // ---------------temp code---------------------------
  edit_review(reviewid){
    var offerdetail={
      reviewid:reviewid,
      offerid : this.offeritem.offerID
    }
    let editmodal = this.shareit.create('EditreviewmodalpagePage', { data: offerdetail });
    editmodal.present();
    editmodal.onDidDismiss(refreshit => {
      if(refreshit){
        // this.offermetatab='review';
        // this.getOfferMeta('review');
        this.getReviews();
      }
      
    });
  }
  delete_review(reviewid){
    console.log('reviewid',reviewid);
    this.showLoader('Deleting review ...');
    this.customerservice.deleteReview(this.offeritem.offerID,reviewid,localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.getReviews();
      // if (result['status']) {
      //   this.showReviewAlert(result['message']);
      // } else {
      //   this.showReviewAlert(result['message']);
      // }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  
  add_reviewForm(){
    if (this.addreviewForm.dirty && this.addreviewForm.valid) {
      var newReviewData = {
        comment: this.addreviewForm.value.reviewcontent,
      };
      this.showLoader('Submitting review ...');
      this.customerservice.addNewReview(newReviewData,this.offeritem.offerID,localStorage.getItem('token')).then((result) => {
        this.loading.dismiss();
        if (result['status']) {
          this.showReviewAlert(result['message']);
          this.getReviews();
        } else {
          this.showReviewAlert(result['message']);
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    }
  }
  items: any = {
    'desc': this.offeritem.characteristics,
    'review': this.review
  };
//getOfferReview getOfferMeta('review')
  getOfferMeta(type: any) {
    return this.items[type];
  }
  //----------------tempcode----------------------------
  getReviews(){
    console.log('getreview');
      this.customerservice.getOfferReview(this.offeritem.offerID).then((result) => {
     
      if (result['status']) {
        // if have some offers
        this.review.push(result['reviews']);
        console.log(result);
      }
      if(this.loading){
        this.loading.dismiss();
      }
      console.log(result);
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  ShareIt(firstparam,secondparam,bonustype,offerid) {
    var sharedata= {
      'firstparam':0.00,
      'secondparam':0.00,
      'bonustype':'',
      'offerid':''
    }
    sharedata= {
      'firstparam':firstparam,
      'secondparam':secondparam,
      'bonustype':bonustype,
      'offerid':offerid
    }
    let profileModal = this.shareit.create('SocialsharemodalmodalPage', { data: sharedata });
    profileModal.present();
  }
  // singleofferpage(offerid){
  //   console.log('offerid',offerid);
  //   this.showLoader('Loading...');
  //   this.customerservice.getSingleOffer(offerid).then((result) => {
  //     this.loading.dismiss();
      
  //    if(result['status']){
      
  //    } else {
  //      this.showAlert(result['message']);
  //    }
  //    console.log(result);
  //  }, (err) => {
  //    this.loading.dismiss();
  //    console.log("Observable Instance error :", err)
  //  });
  // }
    // if there are further children toggle data
    // toggleItem(i, j) {
    //   this.information[i].children[j].open = !this.information[i].children[j].open;
    // }
    // ionViewWillLeave() { this.loading.dismiss(); }
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
  showReviewAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
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

  dismiss(){
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
