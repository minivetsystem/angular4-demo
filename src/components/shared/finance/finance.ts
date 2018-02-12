import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';

@Component({
  selector: 'finance',
  templateUrl: 'finance.html'
})
export class FinanceComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  aggrdata = {
    total_advertising_cost:'',
    total_earned_amount:'',
    total_offers:'',
    total_purchase:'',
    total_recommendations:'',
    total_recommendators:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController) {
    this.showLoader();
    this.companyprovider.allcompany_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.information = result['departments'];
      // console.log('atm',this.information);
      this.aggrdata.total_advertising_cost= result['totals'].total_advertising_cost;
      this.aggrdata.total_earned_amount= result['totals'].total_earned_amount;
      this.aggrdata.total_offers= result['totals'].total_offers;
      this.aggrdata.total_purchase= result['totals'].total_purchase;
      this.aggrdata.total_recommendations= result['totals'].total_recommendations;
      this.aggrdata.total_recommendators= result['totals'].total_recommendators;
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
    // this.companyprovider.fintotalOffers(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
    //   this.loading.dismiss(); 
    //   this.aggrdata.total_advertising_cost= result['totals'].total_advertising_cost;
    //   this.aggrdata.total_earned_amount= result['totals'].total_earned_amount;
    //   this.aggrdata.total_offers= result['totals'].total_offers;
    //   this.aggrdata.total_purchase= result['totals'].total_purchase;
    //   this.aggrdata.total_recommendations= result['totals'].total_recommendations;
    //   this.aggrdata.total_recommendators= result['totals'].total_recommendators;
    // }, (err) => {
    //   this.loading.dismiss();
    //   console.log("Observable Instance error :", err)
    // });
  }
  toggleSection(i) {
    //console.log(this.information[i]);
    // console.log('toggle'+ this.information[i].department_name);
    this.information[i].open = !this.information[i].open;
    if(this.information[i].open){this.showLoader();}
     //  this.information[i].mydata = "jasbirsingh"+this.information[i].department_name;
    //  console.log(this.things);
    this.companyprovider.company_dept_offers_fin(this.information[i].company_id, this.information[i].id, localStorage.getItem('token')).then((result) => {
      // this.information = result;
      this.information[i].offers = result;
      this.information[i].cofferlength = isset(() => Object.keys(this.information[i].offers.length)) ? 1 : 0;
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
