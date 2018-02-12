import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';
import { Utils} from '../../../pages/utils';
@Component({
  selector: 'offers',
  templateUrl: 'offers.html'
})
export class OffersComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  showedit:boolean= false;
  aggrdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController) {
    // let localData = http.get('assets/information.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    // })
    console.log('vendor',Utils.isVendor());
    if (Utils.isVendor()){ this.showedit=true; }
    this.showLoader();
    this.companyprovider.company_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      console.log('offers',result);
      this.loading.dismiss();
      this.information = result;
      this.aggrdata = this.companyprovider.totaloffers;
      
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });

 
  }
  // http://konekt.local/api/v1/company/1/finance/departments?token=I9G3F8IWPY1MQ1YY&page=1
  /*
  otal_advertising_cost
:
295.2
total_earned_amount
:
12542
total_offers
:
14
total_purchase
:
2
total_recommendations
:
5
total_recommendators
:
1
  */ 
  toggleSection(i) {
    //console.log(this.information[i]);
    // console.log('toggle'+ this.information[i].department_name);
    this.information[i].open = !this.information[i].open;
    if(this.information[i].open){this.showLoader();}
     //  this.information[i].mydata = "jasbirsingh"+this.information[i].department_name;
    //  console.log(this.things);
    this.companyprovider.company_dept_offers(this.information[i].company_id, this.information[i].id, localStorage.getItem('token')).then((result) => {
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
 edit_offer(offerid) {
    this.navCtrl.push('EditOfferPage',{data:offerid});
       // this.navCtrl.push(AddofferPage);
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
