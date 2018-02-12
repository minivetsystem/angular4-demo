import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';

@Component({
  selector: 'analysis',
  templateUrl: 'analysis.html'
})
export class AnalysisComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController) {
    this.showLoader();
    this.companyprovider.company_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.information = result;
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
    if(this.information[i].open){this.showLoader();}
    this.companyprovider.company_dept_offers_ana(this.information[i].company_id, this.information[i].id, localStorage.getItem('token')).then((result) => {
      this.information[i].offers = result;
      this.information[i].cofferlength  = JSON.stringify(this.information[i].offers.offers.length)? 1 : 0;
      this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }

  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() { }
  ionViewWillLeave() { this.loading.dismiss(); }
  ionViewWillEnter() {
    if (!this.alreadyLoaded) {
      this.showLoader();
      this.alreadyLoaded = true;
    } else {
      this.loading.dismiss();
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }
}