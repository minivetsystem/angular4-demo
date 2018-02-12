import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';

@Component({
  selector: 'recommend',
  templateUrl: 'recommend.html'
})
export class RecommendComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController) {

    this.showLoader();
    this.companyprovider.getRecommend(localStorage.getItem('user_id'), localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.information = result['recommends'].companies;
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  toggleSection(i) {
    //console.log(this.information[i]);
    // console.log('toggle'+ this.information[i].department_name);
    this.information[i].open = !this.information[i].open;
    if(this.information[i].open){this.showLoader();}
     //  this.information[i].mydata = "jasbirsingh"+this.information[i].department_name;
    //  console.log(this.things);
    //http://konekt.local/api/v1/company/1/analysis/department/7/offers?token=8JIWEZDHB6TN2YS1&page=2 getRecommendbycompany(userid,companyid, token)
    this.companyprovider.getRecommendbycompany(localStorage.getItem('user_id'),this.information[i].company.id, localStorage.getItem('token')).then((result) => {
      // this.information = result;
      this.information[i].offers = result['recommends'].offers;
      console.log('lmda',result);
      // this.information[i].cofferlength = isset(() => Object.keys(this.information[i].offers.length)) ? 1 : 0;
      // this.information[i].cofferlength  = JSON.stringify(this.information[i].offers.offers.length)? 1 : 0;
      // console.log('len',JSON.stringify(this.information[i].offers.offers.length));
      this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }

  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  // ionViewDidLoad() { }
  // ionViewWillLeave() { this.loading.dismiss(); }
  // ionViewWillEnter() {
  //   if (!this.alreadyLoaded) {
  //     this.showLoader();
  //     this.alreadyLoaded = true;
  //   } else {
  //     this.loading.dismiss();
  //   }

  // }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }

 

}

