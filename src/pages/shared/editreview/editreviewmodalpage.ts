import { Component } from '@angular/core';
import { IonicPage,NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators} from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-editreviewmodalpage',
  templateUrl: 'editreviewmodalpage.html',
})
export class EditreviewmodalpagePage {
  addreviewForm: any;
  loading: Loading;
  offerdetail:any;
  // review:Array<any>=[];
  reviewcontent:any;
  refreshview:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private formBuilder: FormBuilder,private customerservice: CustomerProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController ) {
    this.addreviewForm = this.formBuilder.group({
      'reviewcontent': ['', Validators.required]
    });
    this.offerdetail = navParams.get('data');
    // console.log('yyy',navParams.get('data'));
    // offerid:7
    // reviewid:21
    this.getReviews(this.offerdetail.offerid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeptmodalpagePage');
  }
 dismiss() {
  let data = { 'refreshit': this.refreshview };
    this.view.dismiss(data);
  }
  update_reviewForm(){
    if (this.addreviewForm.dirty && this.addreviewForm.valid) {
      var newReviewData = {
        comment: this.addreviewForm.value.reviewcontent,
        id: this.offerdetail.reviewid
      };
      this.showLoader('Updating review ...');
      this.customerservice.updateReview(newReviewData,this.offerdetail.offerid,localStorage.getItem('token')).then((result) => {
        this.loading.dismiss();
        if (result['status']) {
          this.showReviewAlert(result['message']);
        } else {
          this.showReviewAlert(result['message']);
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    }
  }
  getReviews(offerid){
    this.showLoader('Loading...');
    this.customerservice.getOfferReview(offerid).then((result) => {
   
    if (result['status']) {
      // if have some offers
      // this.review.push(result['reviews']);
        this.reviewcontent= result['reviews'][0].comment;
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
  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
